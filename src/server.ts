import dotenv from "dotenv"
import app from "./app.js";
import connectDb from "./configs/db.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

connectDb();

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})  