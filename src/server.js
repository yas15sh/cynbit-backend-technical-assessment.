import "dotenv/config";
import express from "express";
import helmet from "helmet";
import { contactRouter } from "./routes/contact.routes.js";
import { errorHandler } from "./middleware/error-handler.js";

const app = express();
app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "16kb" }));

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, status: "ok" });
});

app.use("/api/v1/contact", contactRouter);
app.use((_req, res) => res.status(404).json({
  success: false,
  error: { code: "NOT_FOUND", message: "Resource not found." }
}));
app.use(errorHandler);

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`Assessment API listening on ${port}`));
