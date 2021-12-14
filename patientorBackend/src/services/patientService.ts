import patients from "../../data/patients";
import { v1 as uuid } from "uuid";

import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
  Entry,
} from "../types";

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const findById = (id: string): PatientEntry | undefined => {
  const patient = patients.find((d) => d.id === id);
  return patient;
};

const addPatient = (entry: NewPatientEntry): NonSensitivePatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn, ...safePatientEntry } = newPatientEntry;
  return safePatientEntry;
};

const addEntry = (
  visitEntry: Entry,
  patientId: string
): PatientEntry | undefined => {
  const activePatient = patients.find((patient) => patient.id === patientId);

  activePatient?.entries.push(visitEntry);
  patients.map((patient) =>
    patient.id === patientId ? activePatient : patient
  );
  return activePatient;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
  addPatient,
  findById,
};
