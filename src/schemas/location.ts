import * as yup from "yup";

export const locationSchema = yup.object({
  name: yup.string().required(),
  placeId: yup.string().required(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
});

export type Location = yup.InferType<typeof locationSchema>;
