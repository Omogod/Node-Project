import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { register } from './interface/register.Interface';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const VERSION: string = "/api/v1";
const BASE_URL : string = 'auth';
app.use(express.json());
app.use(express.urlencoded());

mongoose.connect('mongodb://localhost:27017/crypto-market', {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions, () => {
    console.log("connected to database");
})

const credentialSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
})

 mongoose.model("credentials", credentialSchema, "credentials").create({ 
    username: "tnk",
    email: "a@a.com",
    password: "atiflames123"
}).then((data) => {
    console.log(data);
}).catch(error => {
    console.log(error);
})
    
app.get('/', ( req: Request, res: Response) => {
    console.log(req.params);
  res.send("Express + Typescript Server");
});

app.post(`${VERSION}/${BASE_URL}/register`, (req: Request, res: Response) => {
    let data : register = req.body;
    console.log(data);
    res.status(201).json({
        message: "User registered successfully",
    })
});

// app.post('/hello', (request, response) => {
//     console.log(request.query, request.body)
//     response.send('Hello World!');
// });

app.listen(port, () => {
   console.log(`[server]: Server is running at https://localhost:${port}`);
});