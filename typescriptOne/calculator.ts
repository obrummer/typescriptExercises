type Operation = "multiply" | "add" | "divide" | string;

type Result = number | string | undefined;

export const calculator = (a: number, b: number, op: Operation): Result => {
  console.log(op);
  if (op === "multiply") {
    return a * b;
  } else if (op === "add") {
    return a + b;
  } else if (op === "divide") {
    if (b === 0) return "can't divide by 0!";
    return a / b;
  } else {
    return;
  }
};

// try {
//   console.log(calculator(1, 5, "divide"));
// } catch (error: unknown) {
//   let errorMessage = "Something went wrong.";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }
