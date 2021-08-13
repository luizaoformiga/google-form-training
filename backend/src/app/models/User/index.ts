import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    image: { type: String },
    createdForms: [],
  },
  { timestamps: true }
);

UserSchema.plugin(mongoosePaginate);

const UserModel = mongoose.model("User", UserSchema, "Users");

export default UserModel;
