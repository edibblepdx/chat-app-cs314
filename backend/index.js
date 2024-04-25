import path from "path";
import { fileURLToPath } from 'url';
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "node:http";
import { join } from "node:path";
import { Server } from "socket.io";
//import records from "./routes/record.js";

// import authRoutes from "./routes/auth.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
//app.use("/record", records);

app.get("/", (req, res) => {
	// root route http://localhost:5000/
	// res.send("Hello World");
	res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

// app.use("api/auth", authRoutes)

// start the Express server
server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

