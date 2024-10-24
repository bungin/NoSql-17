import { Schema, model, Types, Document } from "mongoose"; // Types
// import mongoose from "mongoose";

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Schema.Types.ObjectId[];
}

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
    reactions: [],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// interface IReact extends Document {
//     reactionId: Schema.Types.ObjectId;
//     reactionBody: string;
//     username: string;
//     createdAt: Date;
// }
// // CHANGES: added IReact interface to attempt to fix:
// C:\Users\N\bootcamp\homework\17\node_modules\mongoose\lib\schema.js:740
//       throw new TypeError(`Invalid schema configuration: \`${val}\` is not ` +
//             ^
// TypeError: Invalid schema configuration: `true` is not a valid type at path `virtuals`. 
// See https://bit.ly/mongoose-schematypes for a list of valid schema types.
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
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => timestamp.toDateString(),
  },
});

console.log(reactionSchema); //TODO: fix this shit

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model<IThought>("Thought", thoughtSchema);

export default Thought;
