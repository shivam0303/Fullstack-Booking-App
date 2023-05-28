import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

// Connect to MongoDB
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected!");
    } catch (err) {
        console.log(err);
    }
};

mongoose.connection.on("error", (err) => {
    console.log("Mongoose Connection Error : " + err.message);
});

//middleware 
app.use(cookieParser());
app.use(express.json());

app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

//error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";

    return res.status(errorStatus).json({
        message: errorMessage,
        success: false,
        status: errorStatus,
        stack: err.stack,
    })
});


app.listen(3001, () => {
    connect();
    console.log("Server running on port 3001!");
})
