import { Schema, Types, model, type Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Schema.Types.ObjectId[];
  friends: Schema.Types.ObjectId[];
};

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true, 
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
        // this regex ensures that the string contains at least one
        // char before and after the @ symbol, and at least one char 
        // after a dot in the domain.  regex from copilot, decipheringVVVVV
        // (/starts)(.+ any char)(@ literal)(.+ any char)(\. literal period)(.+ any char)(/close)
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})