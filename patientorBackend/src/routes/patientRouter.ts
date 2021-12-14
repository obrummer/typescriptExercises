/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry } from "../utils";
import { toNewVisitEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const diary = patientService.findById(req.params.id);

  if (diary) {
    const diary = patientService.findById(req.params.id);
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const diary = patientService.findById(req.params.id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newVisitEntry = toNewVisitEntry(req.body);
    if (diary && newVisitEntry !== undefined) {
      const addedEntry = patientService.addEntry(newVisitEntry, req.params.id);
      if (addedEntry !== undefined) {
        res.json(addedEntry);
      }
    }
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
