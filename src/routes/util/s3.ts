import { storage } from "@/config/storage";
import { env } from "@/env";
import {
  PutObjectCommand,
  type PutObjectCommandInput,
} from "@aws-sdk/client-s3";

export const uploadServerImage = async (
  id: string,
  buffer: Buffer
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const randomHash = crypto.randomUUID();
    const fileName = `${id}/cover/${randomHash}`;

    const params: PutObjectCommandInput = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
    };

    try {
      await storage.send(new PutObjectCommand(params));
      resolve(fileName);
    } catch (error) {
      console.error("Error uploading audio:", error);
      reject("Error occured");
    }
  });
};
