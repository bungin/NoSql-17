import { Schema, model, type Document } from "mongoose";
import mongoose from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Schema.Types.ObjectId[];
  friends: Schema.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 35,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
      // this regex ensures that the string contains at least one
      // char before and after the @ symbol, and at least one char
      // after a dot in the domain.  regex from copilot; decipheringVVVVV
      // (/starts)(.+ any char)(@ literal)(.+ any char)(\. literal period)(.+ any char)(/close)
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true, //do i need this? research
    },
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model<IUser>("User", userSchema);

export default User;
