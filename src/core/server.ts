import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { rateLimit } from "express-rate-limit";
import {reqLogger} from "../utilites/utils/reqLogger";
import config from "../config/index";
import { CustomRequest } from "../utilites/utils/interface";
import { successResponse,errorResponse, handleError } from "../utilites/utils/responses";
import router from "../routes/index";

const app = express();

const limiter = rateLimit({
	windowMs: 0.5 * 60 * 1000,
	max: 3,
	standardHeaders: true,
	legacyHeaders: false
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "50mb"}));
app.use(express.urlencoded({ extended: false, limit: "50mb"}));
app.use(limiter);
app.use(reqLogger);
declare global {
	namespace Express {
	  interface Request extends CustomRequest { }
	}
  }
app.use("/api", router);

app.get("/",(req, res) => {
	res.send(`Welcome to Our order service API`);
});

app.use((req, res) => res.status(404).send({
	error: "Invalid route",
	message: "Kindly check your route and resend your request"
}));

export default app;