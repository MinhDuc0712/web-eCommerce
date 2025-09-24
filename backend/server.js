import express from "express";
import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js"
import brandRoutes from "./src/routes/brandRoutes.js"
import categoryRoutes from "./src/routes/categoryRoutes.js"
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/category", categoryRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server đang chạy trên cổng ${PORT}`);
    });
})

