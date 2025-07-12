import { useState, useEffect } from "react";
import { Teacher } from "../types/teacher";
import {
  fetchTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../services/teacherService";

export const useTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        setLoading(true);
        const data = await fetchTeachers();
        setTeachers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load teachers"
        );
      } finally {
        setLoading(false);
      }
    };

    loadTeachers();
  }, []);

  const addTeacher = async (teacherData: Partial<Teacher>) => {
    try {
      const newTeacher = await createTeacher(teacherData);
      setTeachers((prev) => [...prev, newTeacher]);
      return newTeacher;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add teacher");
      throw err;
    }
  };

  const editTeacher = async (id: string, teacherData: Partial<Teacher>) => {
    try {
      const updatedTeacher = await updateTeacher(id, teacherData);
      setTeachers((prev) =>
        prev.map((teacher) => (teacher.id === id ? updatedTeacher : teacher))
      );
      return updatedTeacher;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update teacher");
      throw err;
    }
  };

  const removeTeacher = async (id: string) => {
    try {
      await deleteTeacher(id);
      setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete teacher");
      throw err;
    }
  };

  return { teachers, loading, error, addTeacher, editTeacher, removeTeacher };
};
