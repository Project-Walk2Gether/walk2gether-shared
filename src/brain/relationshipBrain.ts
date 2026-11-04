/**
 * Jottie's relationship brain: an OB1 ("Open Brain") Supabase project holding
 * memories about the people who walk together.
 *
 * SCOPING RULE: a memory is stored with `participant_uids`, the exact set of
 * people present when it was captured. A walk/room with people S may recall a
 * memory only if participant_uids ⊇ S. So A,B,C recall memories from an
 * A,B,C,D walk, but A,B,C,E do not (E wasn't there), and A,B,C do not recall
 * an A,B memory (C wasn't there).
 *
 * The rule is enforced in Postgres (jsonb containment in
 * recall_relationship_memories), never by filtering client-side.
 *
 * SERVER-ONLY: needs the Supabase service-role key. Never construct this in
 * the mobile app. Implemented with plain fetch so the shared package gains no
 * dependency.
 */

export type RelationshipMemoryKind = "fact" | "plan" | "story" | "preference";

export interface RelationshipMemoryInput {
  content: string;
  participantUids: string[];
  kind: RelationshipMemoryKind;
  walkId: string;
  roomId: string;
  /** ISO time the conversation happened. */
  capturedAt: string;
  /** uid of the person the memory is mainly about, if any. */
  aboutUid?: string | null;
}

export interface RelationshipMemory {
  id: string;
  content: string;
  participantUids: string[];
  kind: RelationshipMemoryKind;
  walkId: string | null;
  roomId: string | null;
  aboutUid: string | null;
  capturedAt: string;
  similarity: number | null;
}

export interface RelationshipBrainConfig {
  supabaseUrl: string;
  supabaseServiceKey: string;
  openaiApiKey: string;
  embeddingModel?: string;
  fetchImpl?: typeof fetch;
}

/** Canonical form of a set of uids: unique, sorted. */
export function canonicalParticipantUids(uids: Iterable<string>): string[] {
  return Array.from(new Set(Array.from(uids).filter(Boolean))).sort();
}

/** True when a memory captured with `memoryUids` may be recalled by `currentUids`. */
export function memoryVisibleTo(memoryUids: string[], currentUids: string[]): boolean {
  const have = new Set(memoryUids);
  return canonicalParticipantUids(currentUids).every((u) => have.has(u));
}

export const RELATIONSHIP_MEMORY_SOURCE = "walk2gether";

export function createRelationshipBrain(config: RelationshipBrainConfig) {
  const f = config.fetchImpl ?? fetch;
  const base = config.supabaseUrl.replace(/\/+$/, "");
  const model = config.embeddingModel ?? "text-embedding-3-small";
  const headers = {
    apikey: config.supabaseServiceKey,
    Authorization: `Bearer ${config.supabaseServiceKey}`,
    "Content-Type": "application/json",
  };

  async function embed(texts: string[]): Promise<number[][]> {
    if (texts.length === 0) return [];
    const res = await f("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model, input: texts }),
    });
    if (!res.ok) throw new Error(`embeddings failed: ${res.status} ${await res.text()}`);
    const json = (await res.json()) as { data: { index: number; embedding: number[] }[] };
    return json.data.sort((a, b) => a.index - b.index).map((d) => d.embedding);
  }

  async function rpc<T>(fn: string, args: Record<string, unknown>): Promise<T> {
    const res = await f(`${base}/rest/v1/rpc/${fn}`, {
      method: "POST",
      headers,
      body: JSON.stringify(args),
    });
    if (!res.ok) throw new Error(`brain rpc ${fn} failed: ${res.status} ${await res.text()}`);
    return (await res.json()) as T;
  }

  type Row = {
    id: string;
    content: string;
    metadata: Record<string, unknown>;
    created_at: string;
    similarity?: number | null;
  };
  const toMemory = (r: Row): RelationshipMemory => ({
    id: r.id,
    content: r.content,
    participantUids: (r.metadata.participant_uids as string[]) ?? [],
    kind: (r.metadata.kind as RelationshipMemoryKind) ?? "fact",
    walkId: (r.metadata.walk_id as string) ?? null,
    roomId: (r.metadata.room_id as string) ?? null,
    aboutUid: (r.metadata.about_uid as string) ?? null,
    capturedAt: (r.metadata.captured_at as string) ?? r.created_at,
    similarity: r.similarity ?? null,
  });

  return {
    embed,

    /**
     * Store memories. Idempotent per (room, content): the SQL function skips a
     * memory whose dedupe_key already exists, so re-running extraction for a
     * room never duplicates.
     */
    async captureMemories(memories: RelationshipMemoryInput[]): Promise<number> {
      const clean = memories.filter((m) => m.content.trim() && m.participantUids.length >= 2);
      if (clean.length === 0) return 0;
      const vectors = await embed(clean.map((m) => m.content));
      const rows = clean.map((m, i) => ({
        content: m.content.trim(),
        embedding: vectors[i],
        metadata: {
          source: RELATIONSHIP_MEMORY_SOURCE,
          type: "relationship_memory",
          kind: m.kind,
          participant_uids: canonicalParticipantUids(m.participantUids),
          walk_id: m.walkId,
          room_id: m.roomId,
          about_uid: m.aboutUid ?? null,
          captured_at: m.capturedAt,
        },
      }));
      return rpc<number>("capture_relationship_memories", { memories: rows });
    },

    /**
     * Memories visible to exactly this set of people (participant_uids ⊇ S).
     * With `query`, ranked by similarity; otherwise most recent first.
     */
    async recallMemories(params: {
      participantUids: string[];
      query?: string | null;
      limit?: number;
      minSimilarity?: number;
    }): Promise<RelationshipMemory[]> {
      const required = canonicalParticipantUids(params.participantUids);
      // A memory is shared by definition: never recall for a set of one, or
      // a solo user would see every memory they were ever part of.
      if (required.length < 2) return [];
      const queryEmbedding = params.query ? (await embed([params.query]))[0] : null;
      const rows = await rpc<Row[]>("recall_relationship_memories", {
        required_uids: required,
        query_embedding: queryEmbedding,
        match_count: params.limit ?? 10,
        min_similarity: params.minSimilarity ?? 0.2,
      });
      // Defence in depth: re-check the scoping rule on what came back.
      return rows.map(toMemory).filter((m) => memoryVisibleTo(m.participantUids, required));
    },

    /** Every memory this user is part of (for "see/delete my memories"). */
    async listMemoriesForUser(uid: string, limit = 200): Promise<RelationshipMemory[]> {
      const rows = await rpc<Row[]>("list_relationship_memories_for_user", {
        target_uid: uid,
        match_count: limit,
      });
      return rows.map(toMemory);
    },

    /** Delete every memory that includes this user. Returns the count deleted. */
    async deleteMemoriesForUser(uid: string): Promise<number> {
      return rpc<number>("delete_relationship_memories_for_user", { target_uid: uid });
    },

    /** Delete one memory, only if this user is part of it. */
    async deleteMemory(uid: string, memoryId: string): Promise<boolean> {
      return rpc<boolean>("delete_relationship_memory", { target_uid: uid, memory_id: memoryId });
    },
  };
}

export type RelationshipBrain = ReturnType<typeof createRelationshipBrain>;
