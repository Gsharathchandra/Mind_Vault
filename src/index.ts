import express from "express";
import { connectDB, ContentModel } from "./db.js";
import { UserModel } from "./db.js";
import { jwt_key } from "./config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { userMiddleware } from "./middleware.js";
dotenv.config();

const app = express();
app.use(express.json());
connectDB();

app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    await UserModel.create({
      username: username,
      password: password,
    });
    res.send("user has been created sucessfully");
  } catch (error) {
    res.status(411).json({
      message: "some error has occured",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const currentuser = await UserModel.findOne({
      username,
      password,
    });
    if (!currentuser) {
      return res.status(401).json({ message: "Invalid credentials ❌" });
    }
    if (currentuser) {
      const token = jwt.sign({ id: currentuser._id }, jwt_key);
      res.json({
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error 🔥" });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const { title, link } = req.body;

  try {
    await ContentModel.create({
      title: title,
      link: link,
      //@ts-ignore
      userId: req.userId,
      tags: [],
    });
    return res.json({
      message: "sucessfully content addeed",
    });
  } catch (error) {
    res.json({
      message: "some error has occured",
    });
  }
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const content = await ContentModel.find({
    userId: userId,
  }).populate("userId","username userId");
  if (content) {
    res.json({
      content,
    });
  } else {
    res.json({
      message: "no content to display",
    });
  }
});

app.delete("/api/v1/content",userMiddleware, async (req,res) => {
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({
        contentId:contentId,
        //@ts-ignore
        userId = req.userId
    })
    res.json({
        message:"content deleted"
    })
    
})

app.listen(3000);
