
import prisma from "../utils/db.server";

type foodData = {
    id?:bigint
    name: string
    quantity: number
    price: number
}

type Success = {
    status: number,
    message: string
}


type Error = {
    status: number,
    errorMessage: string
}

export const createFoodItems = async (data: foodData): Promise<Success | Error> => {
    const { name,quantity, price }=data;
    const Food=await prisma.food.create({
        data:{
            name:name,
            quantity:quantity,
            price:price
        }
    })

    if (!Food) {
        return { status: 404, errorMessage: `Food item could not be created.` }
    }
    return { status: 200, message: "Food item created successfully." }
}


export const getFoodItems = async (): Promise<foodData[] | Error> => {
    const Food = await prisma.food.findMany();
    
    if (Food.length === 0) {
        return { status: 404, errorMessage: "There are no food items in the kitchen." };
    }
    
    return Food;
}


export const getSingleFoodItem = async (item:string): Promise<foodData | Success> => {

    const Food=await prisma.food.findUnique({
       where:{
        name:item
       }  
})

    if (!Food) {
        return { status: 404, message: `There is no ${item} in the kitchen.` }
    }
    return Food;
}

export const updateSingleFoodItem = async (data:foodData): Promise<foodData | Error> => {
    const { id,name,quantity, price }=data;
    const Fooditem=await prisma.food.findUnique({
        where:{
         id:id
        }  
 })
 if(Fooditem){
        const updatedFood=await prisma.food.update({
      where:{
        id:id
      },
      data:{
        name:name?? Fooditem.name,
        quantity:quantity?? Fooditem.quantity,
         price:price?? Fooditem.price
      }
})

if(updatedFood){
    return updatedFood
}else{
    return {status:404, errorMessage:`An error occured while updating the food item of id ${id}.`}
}
 }else{
    return { status: 200, errorMessage: `There is no food item with id ${id}.` }
 }

}


export const deleteFoodItem = async (item:string): Promise<Error | Success> => {

    const Food=await prisma.food.delete({
       where:{
        name:item
       }  
})

    if (!Food) {
        return { status: 404, errorMessage: `There is no ${item} in the kitchen.` }
    }
    return {status: 200, message: `Your item ${item} is deleted successfully.`};
}