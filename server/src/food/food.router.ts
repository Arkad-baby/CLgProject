import express,{ NextFunction, Request, Response } from "express"
import { body, validationResult } from "express-validator"

import * as foodService from "./food.service"


export const foodRouter=express.Router();

//To create Food item




foodRouter.post("/",[

    body("name")
    .isString().withMessage("Item name must be String.")
    .notEmpty().withMessage("Item name cannot be empty.")
    .isLength({ min: 3, max: 36 }).withMessage("Item name must be less than 36 characters or more than 3 characters."),

    body("quantity")
    .isNumeric().withMessage("Quantity must be in numeric.")
    .notEmpty().withMessage("Quantity cannot be empty.")
    .custom((value, { req }) => {
        if (parseFloat(value) < 0) {
            throw new Error("Quantity must be greater than 0.");
        }
        return true;
    }),

    body("price")
    .isNumeric().withMessage("Price must be in numeric.")
    .notEmpty().withMessage("Price cannot be empty.")
    .custom((value, { req }) => {
        if (parseFloat(value) <0) {
            throw new Error("Price must be greater than 0.");
        }
        return true;
    })
],

async(request:Request,response:Response,next: NextFunction)=>{
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    try {
        const item=await foodService.createFoodItems(request.body)
        console.log(item)
        const {status,message}:any=item;
        if (status == 404) {
            return response.status(status).json(item)
        }
        return response.status(status).json(item)
    } 
    catch (error:any) {
        next(error);
    }

})

//to get all items

foodRouter.get("/", async(request: Request, response: Response,next: NextFunction) => {
    try {
        const getItems = await foodService.getFoodItems();
        
        if (!getItems) {
            // Handle the case where no items are found
            return response.status(404).json({ success: false, message: 'No items found' });
        }
    
        return response.status(200).json(getItems);
    } catch (error) {
        next(error);
    }
});

//to get single item

foodRouter.get("/:name", async(request: Request, response: Response,next: NextFunction ) => {
    try {
        const name: string = request.params.name;
        const getItem = await foodService.getSingleFoodItem(name);
        
        if (!getItem) {
            // Handle the case where no items are found
            return response.status(404).json(getItem);
        }
        console.log(getItem)
        return response.status(200).json(getItem);
    } catch (error) {
        next(error);
    }
});


// to delete an item

foodRouter.delete("/:name",async(request:Request,response:Response,next: NextFunction)=>{
    try {
        const name: string = request.params.name;
        const delteItem= await foodService.deleteFoodItem(name);
     
         const {status}:any=delteItem;
         if(status==404){
            return response.status(status).json(delteItem)
         }
         return response.status(status).json(delteItem)
    
    } catch (error:any) {
        next(error);
    }
})

    