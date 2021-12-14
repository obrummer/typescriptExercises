interface BmiValues {
  value1: number;
  value2: number;
}

const parseTheseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

type Height = number;
type Weight = number;

export const calculateBmi = (height: Height, weight: Weight) => {
  const bmi = weight / ((height / 100) * (height / 100));

  let result;
  if (bmi < 18.5) {
    result = "Underweight";
  }
  if (bmi >= 18.5 && bmi < 25) {
    result = "Normal weight";
  }
  if (bmi >= 25) {
    result = "Overweight";
  }
  console.log(result);
  const total = {
    height,
    weight,
    result,
  };
  return total;
};

try {
  const { value1, value2 } = parseTheseArguments(process.argv);
  calculateBmi(value1, value2);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
