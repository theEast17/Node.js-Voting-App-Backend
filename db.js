import mongoose from "mongoose";
import  dotenv  from 'dotenv'
dotenv.config()

// eslint-disable-next-line no-undef
const mongoUrl=process.env.DATABASE_LOCAL_URL
// eslint-disable-next-line no-undef
// const mongoUrl=process.env.DATABASE_URL

const connectDb = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log(`MongoDb Connected`)
  } catch (err) {
    console.log("failed to connect",err);
  }
};

export default connectDb;
