
import type { Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwt_key } from "./config.js";

export const userMiddleware = (req : Request ,res : Response,next:NextFunction) =>{
  const header = req.headers["authorization"];
  const decoded = jwt.verify(header as string,jwt_key);
  if(decoded){
    //@ts-ignore
    req.userId = decode.id;
    next();
  }
  else{
    res.status(401).json({
        message:"you are not logged in"
    })
  }

}