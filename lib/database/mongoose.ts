import mongoose from "mongoose";


const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
  throw new Error(
    "Please define the MONGODB_URL environment variable inside .env.local"
  );
}
let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}
async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    };
    cached.promise = cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: 'imaginify', bufferCommands: false
    })
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
export default connectToDatabase;

// import mongoose, { Mongoose } from 'mongoose';

// const MONGODB_URL = process.env.MONGODB_URL;

// interface MongooseConnection {
//   conn: Mongoose | null;
//   promise: Promise<Mongoose> | null;
// }

// let cached: MongooseConnection = (global as any).mongoose

// if(!cached) {
//   cached = (global as any).mongoose = {
//     conn: null, promise: null
//   }
// }

// export const connectToDatabase = async () => {
//   if(cached.conn) return cached.conn;

//   if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  // cached.promise =
  //   cached.promise ||
  //   mongoose.connect(MONGODB_URL, {
  //     dbName: 'imaginify', bufferCommands: false
  //   })

//   cached.conn = await cached.promise;

//   return cached.conn;
// }
