import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from "cors";

import { foodRouter } from './food/food.router';

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
app.use('/food',foodRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with  TypeScript!');
});



app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});
