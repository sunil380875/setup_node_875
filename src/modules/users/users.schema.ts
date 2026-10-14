import mongoose, { Document, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export interface IUser extends Document {
  fullName?: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: false, trim: true, index: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
  },
  {
    timestamps: true,
    collection: "users",
    versionKey: false,
  }
);

userSchema.plugin(mongoosePaginate);

export const User = mongoose.model<IUser>("User", userSchema);
export default userSchema;
