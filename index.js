import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "./models/user.model.js"; 

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// MongoDB connection function
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${"trial_backend"}`);
    console.log(`MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection failed!", error);
    process.exit(1); // Exit with failure
  }
};

// Connect to DB and start the server
connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`⚙️ Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error during server startup:", err);
  });

// Example route
app.get("/", (req, res) => res.send("Express on Vercel"));

// Uncomment and adjust the following code if you want to implement the user route
app.post("/users", async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            status: 200,
            data: users,
            message: "Users fetched successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Failed to fetch users",
        });
    }
});

// Export app for testing or further use
export default app;  // This is the correct ES module export
