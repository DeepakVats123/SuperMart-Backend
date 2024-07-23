import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

async function connectDB(){
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MONGODB CONNECTED !!`)
    } catch (error) {
       console.log("Database connection failed",error)
       process.exit(1) 
    }
}

export default connectDB;