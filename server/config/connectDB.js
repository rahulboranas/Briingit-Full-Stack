// import mongoose from "mongoose";
// import dotenv  from "dotenv";
// import { contentSecurityPolicy } from "helmet";
// dotenv.config()
// if(!process.env.MONGODB_URI){
//     throw new Error(
//         "plz provide MONGODB_URI in the .env file"
//     )
// }
// async function connectDB(){
//     try{
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("connect to db")
//     } catch(error){
//         console.log("Mongodb connect error",error)
//     }
// }
// export default connectDB ;
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("plz provide MONGODB_URI in the .env file");
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 sec timeout
      ssl: true, // Atlas SSL
      tlsAllowInvalidCertificates: true // Windows/OpenSSL ke issues fix karne ke liye
    });
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error(" MongoDB connect error:", error.message);
    process.exit(1);
  }
}

export default connectDB;
