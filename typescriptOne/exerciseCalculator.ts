interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number | undefined;
  ratingDescription: string | undefined;
  target: number;
  average: number;
}

interface ExerciseValues {
  targetValue: number;
  hours: Array<number>;
}

const parseTheArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const argsCopy = [...args];
  argsCopy.splice(0, 2);
  const changedValues = argsCopy.map((item) => Number(item));

  if (!changedValues.some(isNaN)) {
    const targetValue = changedValues[0];
    changedValues.shift();
    const hours = changedValues;
    return {
      targetValue,
      hours,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateExercises = (
  target: number,
  exercises: Array<number>
): Results => {
  const totalHours = exercises.reduce(function (a, b) {
    return a + b;
  }, 0);

  const periodLength = exercises.length;
  const trainingDays = exercises.filter((ex) => ex !== 0).length;
  const average = totalHours / periodLength;
  const success = average >= target;

  const calculateRating = () => {
    let rating;
    let ratingDescription;
    const percentage = (average / target) * 100;
    if (percentage < 80) {
      rating = 1;
      ratingDescription = "You could do better";
    }
    if (percentage >= 80 && percentage < 120) {
      rating = 2;
      ratingDescription = 'Good job"';
    }
    if (percentage >= 120) {
      rating = 3;
      ratingDescription = "Excellent!!!";
    }
    return { rating, ratingDescription };
  };

  const rating = calculateRating().rating;
  const ratingDescription = calculateRating().ratingDescription;

  const total = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
  console.log(total);
  return total;
};

try {
  const { targetValue, hours } = parseTheArguments(process.argv);
  calculateExercises(targetValue, hours);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
