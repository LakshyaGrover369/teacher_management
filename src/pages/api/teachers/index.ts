import { NextApiRequest, NextApiResponse } from "next";
import { teachers } from "../../../data/mockTeachers";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      res.status(200).json(teachers);
    } else if (req.method === "POST") {
      const newTeacher = {
        id: Math.random().toString(36).substring(2, 9),
        ...req.body,
      };
      teachers.push(newTeacher);
      res.status(201).json(newTeacher);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Server error",
    });
  }
}
