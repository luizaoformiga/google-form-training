import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ResponseSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
    },

    userId: {
      type: String,
    },

    response: [
      {
        questionId: String,
        optionId: String,
      },
    ],
  },
  { timestamps: true }
);

ResponseSchema.plugin(mongoosePaginate);
const ResponseModel = mongoose.model("Response", ResponseSchema, "Response");

export default ResponseModel;