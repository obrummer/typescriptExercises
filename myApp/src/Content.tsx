import React from "react";
import { CoursePart } from "./types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  courseParts.forEach((part) => {
    switch (part.name) {
      case "Fundamentals":
        break;
      case "Advanced":
        break;
      case "Using props to pass data":
        break;
      case "Deeper type usage":
        break;
      case "Backend development":
        break;
      default:
        return assertNever(part);
    }
  });

  return (
    <div>
      {courseParts.map((part) => (
        <div key={part.name}>
          <Part key={part.name} part={part} />
          <br />
        </div>
      ))}
    </div>
  );
};

export default Content;
