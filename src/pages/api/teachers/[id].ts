import { NextApiRequest, NextApiResponse } from "next";
import { teachers } from "@/data/mockTeachers";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const teacherIndex = teachers.findIndex((t) => t.id === id);

    if (teacherIndex === -1) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (req.method === "GET") {
      res.status(200).json(teachers[teacherIndex]);
    } else if (req.method === "PUT") {
      const updatedTeacher = { ...teachers[teacherIndex], ...req.body };
      teachers[teacherIndex] = updatedTeacher;
      res.status(200).json(updatedTeacher);
    } else if (req.method === "DELETE") {
      teachers.splice(teacherIndex, 1);
      res.status(204).end();
    } else {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Server error",
    });
  }
}
