import express from "express";
import dotenv from "dotenv";
import cors from "cors";
//import records from "./routes/record.js";

import authRoutes from "./routes/auth.routes.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
//app.use("/record", records);

app.get("/", (req, res) => {
	// root route http://localhost:5000/
	res.send("Hello World");
});

app.use("api/auth", authRoutes)

// start the Express server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

