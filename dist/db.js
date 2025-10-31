import mongoose from "mongoose";
import dotenv from "dotenv";
import { Schema, model } from "mongoose";
dotenv.config();
//hello
const MONGO_URL = process.env.MONGO_URL;
export const connectDB = async () => {
    await mongoose.connect(MONGO_URL);
    console.log("sucessfully connected to db");
};
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: true
    }
});
const contentSchema = new Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose.Types.ObjectId, ref: 'User', require: true }
});
export const UserModel = model("User", UserSchema);
export const ContentModel = model("content", contentSchema);
//# sourceMappingURL=db.js.map