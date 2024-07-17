import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PORT: z.string(),
    DATABASE_URL: z.string().url(),
    AWS_BUCKET_NAME: z.string(),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    BUCKET_REGION: z.string(),
    NEXTAUTH_SECRET: z.string(),
  },

  client: {},

  runtimeEnv: {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    BUCKET_REGION: process.env.BUCKET_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
