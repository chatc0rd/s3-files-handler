import multer from "multer";
import path from "path";

export const multerMiddleware = multer({
  fileFilter: (_, file, callback) => {
    const ext = path.extname(file.originalname);

    if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".webp"
    ) {
      return callback(new Error("Invalid type of file"));
    }

    callback(null, true);
  },
}).single("icon");
