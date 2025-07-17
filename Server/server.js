import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
await connectCloudinary();

app.use(cors());
app.use(clerkMiddleware());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => res.send("server is live"));
// when we create any routes after this line requireAuth , then every route will be protected
app.use(requireAuth());

app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
