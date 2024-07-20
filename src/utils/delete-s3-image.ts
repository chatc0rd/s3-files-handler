import { DeleteObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import { storage } from "@/config/storage";

export const deleteS3Image = async (prismaId: string) => {
  const { Contents } = await storage.send(
    new ListObjectsCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: prismaId + "/image",
    })
  );

  if (Contents) {
    Contents.forEach(async ({ Key }) => {
      await storage.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key,
        })
      );
    });
  }
};
