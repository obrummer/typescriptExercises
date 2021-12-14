import React from "react";
import { CoursePart } from "./types";

const Part = ({ part }: { part: CoursePart }) => {
  return (
    <div>
      <p>
        {part.name} {part.exerciseCount}
      </p>
      {part.description && <p>{part.description}</p>}
      {part.groupProjectCount && <p>{part.groupProjectCount}</p>}
      {part.exerciseSubmissionLink && <p>{part.exerciseSubmissionLink}</p>}
      {part.requirements && (
        <p>Requirements: {part.requirements.map((item) => `${item} `)}</p>
      )}
    </div>
  );
};

export default Part;
