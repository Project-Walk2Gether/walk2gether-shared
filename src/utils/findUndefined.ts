// Helper to find undefined values in an object
export function findUndefined(obj: any, path = "") {
  if (typeof obj === "object" && obj !== null) {
    if (obj._app) return;
    for (const key in obj) {
      if (obj[key] === undefined) {
        console.warn(`Undefined value at ${path ? path + "." : ""}${key}`);
      } else {
        findUndefined(obj[key], path ? path + "." + key : key);
      }
    }
  }
}
