import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const ImageModel = mongoose.model("Image", imageSchema);

export default ImageModel;