import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log("Kết nối với MongoDB thành công");
    } catch (error) {
        console.error("Kết nối với MongoDB thất bại:", error.message);
        process.exit(1);
    }
};

