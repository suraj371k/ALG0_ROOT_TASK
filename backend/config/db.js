import mongoose from "mongoose";

const connectDb = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Mongodb connected successfully!"))
    .catch(() => console.log("Mongodb connection failed"));
};

export default connectDb