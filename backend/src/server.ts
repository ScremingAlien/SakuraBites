import express from "express";
import { type Application } from "express";

const app: Application = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  const ooo = {
    ky: "ds",
  };

  res.send("Hello, TypeScript Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
