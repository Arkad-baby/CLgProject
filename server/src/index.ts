import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from "cors";

import { userRouter } from './user/user.router';
import { orderRouter } from './foodOrder/foodOrder.router';
import { megaOrderRouter } from './megaOrder/megaOrder.router';

// Load environment variables from .env file
dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT)

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static('public'));
app.use('/user',userRouter)
app.use('/foodOrder',orderRouter)
app.use('/megaOrder',megaOrderRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with  TypeScript!');
});



app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});
