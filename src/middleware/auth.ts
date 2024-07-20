import { db } from "@/db";
import type { Request, Response, NextFunction } from "express";
import { decodeCookies } from "@/utils/decode-cookies";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const session = await decodeCookies(token as string);
    if (!session?.sub) {
      return res.status(401).send({
        message: "Invalid Credentials",
      });
    }

    const tokenExpiration = new Date(Number(session.exp)).getTime();
    const currentDateInSeconds = Number(
      new Date().getTime().toString().slice(0, -3)
    );

    if (tokenExpiration < currentDateInSeconds) {
      return res.status(401).send({
        message: "Credentials Expired",
      });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, session.sub),
    });

    if (!user?.id) {
      return res.status(404).send({
        message: "User does not exist",
      });
    }

    next();
  } catch (err) {
    return res.status(401).send({
      message: "Invalid Credentials",
      err: `${err}`,
    });
  }
};
