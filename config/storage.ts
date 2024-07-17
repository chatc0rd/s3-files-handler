import { S3, S3Client } from "@aws-sdk/client-s3";
import { env } from "bun";

export const storage = new S3Client({
  region: env.BUCKET_REGION,
});

export const s3 = new S3({
  region: env.BUCKET_REGION,
});
