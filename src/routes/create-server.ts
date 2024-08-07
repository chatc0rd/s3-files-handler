import { Router } from "express";
import { auth } from "@/middleware/auth";
import { v4 } from "uuid";
import { decodeCookies } from "@/utils/decode-cookies";
import { multerMiddleware } from "./middleware/multer";
import { uploadServerImage } from "./util/s3";
import { getS3Uri } from "@/utils/get-s3-uri";
import { db } from "@/db";
import { channels, servers } from "@/db/schema";
const router = Router();

router.post("/create-server", auth, async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const session = await decodeCookies(token as string);
    const cuid = v4();

    multerMiddleware(req, res, async () => {
      const name = req.body.name;
      const disoveryPublic = req.body.public === "true";
      const icon = req.file;

      if (!name) {
        return res.status(403).send({
          message: "Fields are missing",
        });
      }

      let iconUrl = "";

      if (icon?.buffer) {
        const uploadIcon = await uploadServerImage(
          cuid,
          icon?.buffer as Buffer
        );
        const audioUri = getS3Uri(uploadIcon);
        iconUrl = audioUri;
      }

      const newServer = await db
        .insert(servers)
        .values({
          id: cuid,
          ownerId: session?.sub as string,
          icon: iconUrl,
          name,
          public: disoveryPublic,
        })
        .returning();

      await db.insert(channels).values([
        {
          serverId: newServer[0].id,
          name: "general",
          type: "TEXT",
        },
        {
          serverId: newServer[0].id,
          name: "voice",
          type: "VOICE",
        },
      ]);

      return res.send({
        message: "Server created",
        success: true,
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
