import {
  NewPatientEntry,
  // NewVisitEntry,
  Entry,
  Gender,
  Type,
  DiagnoseEntry,
  HospitalEntry,
  Discharge,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HealthCheckRating,
} from "./types";
import { v1 as uuid } from "uuid";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error("Incorrect or missing parameter");
  }

  return comment;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing weather: " + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (param: any): param is Type => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Type).includes(param);
};

const parseType = (type: unknown): Type => {
  if (!type || !isType(type)) {
    throw new Error("Incorrect or missing type: " + type);
  }
  return type;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: Entry[];
};

export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries,
  };

  return newEntry;
};

type VisitEntryFields = {
  date: unknown;
  type: unknown;
  specialist: unknown;
  description: unknown;
  diagnosisCodes: Array<DiagnoseEntry["code"]>;
  discharge: Discharge;
  employerName: unknown;
  healthCheckRating: HealthCheckRating;
};

export const toNewVisitEntry = ({
  date,
  type,
  specialist,
  diagnosisCodes,
  description,
  discharge,
  employerName,
  healthCheckRating,
}: VisitEntryFields):
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry
  | undefined => {
  const currentType = parseType(type);

  switch (currentType) {
    case Type.Hospital:
      const newHospitalEntry: HospitalEntry = {
        date: parseDate(date),
        type: "Hospital",
        specialist: parseString(specialist),
        description: parseString(description),
        diagnosisCodes,
        id: uuid(),
        discharge,
      };
      return newHospitalEntry;
    case Type.OccupationalHealthcare:
      const newOccupationalEntry: OccupationalHealthcareEntry = {
        date: parseDate(date),
        type: "OccupationalHealthcare",
        specialist: parseString(specialist),
        employerName: parseString(employerName),
        description: parseString(description),
        diagnosisCodes,
        id: uuid(),
      };
      return newOccupationalEntry;
    case Type.HealthCheck:
      const newHealthEntry: HealthCheckEntry = {
        date: parseDate(date),
        type: "HealthCheck",
        specialist: parseString(specialist),
        description: parseString(description),
        diagnosisCodes,
        id: uuid(),
        healthCheckRating,
      };
      return newHealthEntry;
  }
};
