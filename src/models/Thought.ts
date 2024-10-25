import { Schema, model, Types, Document } from "mongoose"; // Types
// import mongoose from "mongoose";

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Schema.Types.ObjectId[];
}

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: [true, "Please enter a reaction!"],
    maxlength: 280,
  },
  username: { //does this ref with User?
    type: String,
    // ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => timestamp.toDateString(),
  },
});

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: [true, "Please enter a thought!"],
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);


// console.log(reactionSchema); //TODO: fix this shit

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model<IThought>("Thought", thoughtSchema);

export default Thought;
