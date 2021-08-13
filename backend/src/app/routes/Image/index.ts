import { Router } from "express";
import multer from "multer";
import path from "path";
import { ImageModel } from "@/app/models";

const storage = multer.diskStorage({
  destination: "./public",
  filename(req, file, cb) {
    cb(
      null,
      "google-form-content-questions-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

const ImageRouter = Router();
//const route = new ImageModel();

ImageRouter.get("/", async (req, res) => {
  try {
    const result = await ImageModel.find().lean();
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

ImageRouter.post("/", upload.single("myfile"), async (req, res) => {
  //const file = req.file; // file passed from client
  //const meta = req.body; // all other values passed from the client, like name, etc..

  const data = {
    image: req.file.filename,
  };

  const newImage = new ImageModel(data);
  await newImage.save().then((docs) => {
    console.log(docs);
    res.json({
      image: docs.image,
      host: req.protocol + "://" + req.get("host"),
    });
  });
});

export default ImageRouter;
