import express, {
  Application,
  Request,
  Response,
  NextFunction as NF,
} from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { API } from "../routes/API";

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());

app.use("/api", API);

app.use((err: Error, _: Request, res: Response, next: NF) => {
  return res.status(500).json(err.message);
});

export default app;
