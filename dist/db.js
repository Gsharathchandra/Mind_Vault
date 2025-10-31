import mongoose from "mongoose";
import dotenv from "dotenv";
import { Schema, model } from "mongoose";
dotenv.config();
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
export const UserModel = model("User", UserSchema);
//# sourceMappingURL=db.js.map