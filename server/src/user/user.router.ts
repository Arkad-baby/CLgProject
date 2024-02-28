import prisma from "../utils/db.server";

import express,{ NextFunction, Request, Response } from "express"


export const userRouter=express.Router();

type userData={
    Email:string,
    userName:string,
    uuid:string,
    hasImage:boolean,
    imageUrl:string
}

//To get a single user

userRouter.get("/:uuid",async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {uuid}=req.params
        const user=await prisma.user.findUnique({
            where:{
                uuid:uuid
            }
        })
        if(!user){
            return res.status(404).json({success:false,ErrorMessage:"User not found."})
        }
        return res.status(200).json({success:true,message:"User exists."})
        
    } catch (error) {
        next(error) 
    }
})



//To create a user
userRouter.post("/",async(req:Request,res:Response,next:NextFunction)=>{
    try {
    const {Email,userName,uuid,hasImage,imageUrl}:userData=req.body;
    const user=await prisma.user.create({
        data:{
            Email:Email,
            userName:userName,
            uuid:uuid,
            hasImage:hasImage,
            imageUrl:imageUrl
        }
    })

    if(!user){
        return res.status(404).json({success:false,errorMessage:"User not created"})
        
    }
    return res.status(200).json({success:true,errorMessage:"User created successfully."})
} catch (error) {
      next(error)  
}
})


//To get all the food orders of a user

userRouter.get("/foodOrder/:userId",async(req:Request,res:Response,next:NextFunction)=>{
    const {userId}=req.params

    const user=await prisma.user.findUnique({
        where:{
            uuid:userId
        }
    })
if(!user){
    return res.status(404).json({success:false,errorMessage:`User of id ${userId} was not found.`})
}
    const orders=await prisma.megaFoodOrder.findMany({
        where:{
            userId:userId
        },
  
   include:{
    FoodOrder:{
        select:{
            id:true,
            created_at:true,
            food:true,     
            foodQuantity:true,  
           description:true,
            completed:true,
        }
    }
   }
    })

    if(!orders){
        return res.status(400).json({success:false,errorMessage:`Cannot get orders of user id ${userId}.`})
    }
    return res.status(200).json({ success:true, data:orders})
})
userRouter.get("/drinksOrder/:userId",async(req:Request,res:Response,next:NextFunction)=>{
    const {userId}=req.params

    const user=await prisma.user.findUnique({
        where:{
            uuid:userId
        }
    })
if(!user){
    return res.status(404).json({success:false,errorMessage:`User of id ${userId} was not found.`})
}
    const orders=await prisma.megaDrinksOrder.findMany({
        where:{
            userId:userId
        },
  
   include:{
    DrinksOrder:{
        select:{
            id:true,
            created_at:true,
            drinks:true,     
            drinksQuantity:true,  
           description:true,
            completed:true,
        }
    }
   }
    })

    if(!orders){
        return res.status(404).json({success:false,errorMessage:`Cannot get drinks order of user id ${userId}.`})
    }
    return res.status(200).json({ success:true, data:orders})
})