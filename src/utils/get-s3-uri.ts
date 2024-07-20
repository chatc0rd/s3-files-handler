import { env } from "@/env";

export const getS3Uri = (key: string) =>
  `https://${env.AWS_BUCKET_NAME}.s3.${env.BUCKET_REGION}.amazonaws.com/${key}`;