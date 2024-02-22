import { foodRouter } from "../food/food.router";
import prisma from "../utils/db.server";

import express,{ NextFunction, Request, Response } from "express"

export const orderRouter=express.Router();


type foodOrderData={
    id:string,
    created_at:Date,
    food:string,
    foodQuantity:number,
    description?:string,
    completed:boolean,
    userId:string
}

type updatedFoodOrderData={
    id:string,
    food:string,
    foodQuantity:number,
    description?:string,   
}

// to create an order
orderRouter.post("/",async(req:Request,res:Response,next:NextFunction)=>{


   
    try {

        const data:foodOrderData[]=req.body;

        const megaOrder=await prisma.megaOrder.create({
            data:{
                userId:data[0].userId
            }
        })
        if(!megaOrder){
            return res.status(400).json(`An error occured.`)  
        }

        const orderDataArray = data.map((dat) => ({
            completed: false,
            food: dat.food,
            foodQuantity: dat.foodQuantity,
            megaOrderId: megaOrder.id,
            description: dat.description?? null,
        }));
        const foodOrder = await prisma.foodOrder.createMany({
            data: orderDataArray,
        });


           if(!foodOrder){
            return res.status(400).json("Your food order was not created.")
        }
        return res.status(200).json(`Your food order was created successfully.`)
       
     
    } catch (error) {
        next(error)
    }
}
)

//To mark the completion of a food Order

// orderRouter.patch("/",async(req:Request,res:Response,next:NextFunction)=>{
//     try {
//         const {foodOrderId}=req.body;
//       if(!foodOrderId){
//         return res.status(400).json("Invalid food orderId.")
//       }
//       const foodOrder= await prisma.foodOrder.findUnique({
//         where:{
//             id:  foodOrderId
//         }  
//     })
//     if(!foodOrder){
//         return res.status(400).json(`Invalid orderId ${foodOrderId}`) 
//     }
//           const orderCompleted=await prisma.foodOrder.update({
//               where:{
//                   id:foodOrderId
//                 },

//                 data:{
                    
//                     completed:true
//                 }
//             })

//             if(!orderCompleted){
//                 return res.status(400).json("Your order was not found.")
//             }
//             return res.status(200).json(`Your order ${foodOrderId} was completed successfully.`)
        
//     } catch (error) {
//         next(error) 
//     }
// })


//TO delete an order

orderRouter.delete("/:id",async(req:Request,res:Response,next:NextFunction)=>{
    const id=req.params.id;
    console.log(id)
    try {
        const order=await prisma.foodOrder.findUnique({
            where:{
                id:  id
            }  
        })
        if(!order){
            return res.status(400).json(`Invalid food orderId ${id}`) 
        }
          const deleteOrder=await prisma.foodOrder.delete({
        where:{
            id:  id
        }
    })
    if(!deleteOrder){
        return res.status(400).json("Your order was not deleted.")
    }
    return res.status(200).json(`Your order of id ${id} was deleted successfully.`)
    } catch (error) {
        next(error) 
    }
  
})


//To edit a food order

foodRouter.patch("/:id",async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {id}=req.params
        console.log(id)
        if(!id){   
             try {
            const {foodOrderId}=req.body;
          if(!foodOrderId){
            return res.status(400).json("Invalid food orderId.")
          }
          const foodOrder= await prisma.foodOrder.findUnique({
            where:{
                id:  foodOrderId
            }  
        })
        if(!foodOrder){
            return res.status(400).json(`Invalid orderId ${foodOrderId}`) 
        }
              const orderCompleted=await prisma.foodOrder.update({
                  where:{
                      id:foodOrderId
                    },
    
                    data:{
                        
                        completed:true
                    }
                })
    
                if(!orderCompleted){
                    return res.status(400).json("Your order was not found.")
                }
                return res.status(200).json(`Your order ${foodOrderId} was completed successfully.`)
            
        } catch (error) {
            next(error) 
        }

        }
        const {food,
            foodQuantity,
            description}:updatedFoodOrderData=req.body;
        const foodOrder=await prisma.foodOrder.findUnique({
            where:{
                id:id
            }
        })
        if(!foodOrder){
            return res.status(404).json(`Food order of id ${id} is not available.`)
        }
        const updatedFoodOrder=await prisma.foodOrder.update({
            where:{
                id:id
            },
            data:{
                food:food,
                foodQuantity:foodQuantity,
                description:description

            }
        })
        if(!updatedFoodOrder){
            return res.status(400).json("Your food order was not updated.")
        }
        return res.status(200).json({message: `Food item with ID ${id} updated successfully` })

    } catch (error) {
        next(error)
    }
})


