import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculator } from "./calculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const result = calculateBmi(Number(height), Number(weight));
    res.send(result);
  } else {
    res.status(400).send({ error: "Provided values were not numbers!" });
  }
});

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if (
    !isNaN(Number(value1)) &&
    !isNaN(Number(value2)) &&
    typeof op === "string" &&
    ["multiply", "add", "divide"].includes(op)
  ) {
    const result = calculator(Number(value1), Number(value2), op);
    res.json(result);
  } else {
    res.status(400).send({ error: "Provided values were not numbers!" });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (
    !isNaN(Number(target)) &&
    daily_exercises instanceof Array &&
    daily_exercises.length > 0 &&
    !daily_exercises.some(isNaN)
  ) {
    const result = calculateExercises(
      Number(target),
      daily_exercises.map((item) => Number(item))
    );
    res.json(result);
  } else if (daily_exercises === undefined || target === undefined) {
    res.status(400).send({ error: "Parameters missing" });
  } else {
    res.status(400).send({ error: "Provided values were not numbers!" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
