import { useState, useEffect } from "react";
import { Teacher } from "../types/teacher";
import { fetchTeacherById } from "../services/teacherService";

export const useTeacher = (id: string) => {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeacher = async () => {
      try {
        setLoading(true);
        const data = await fetchTeacherById(id);
        setTeacher(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load teacher");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadTeacher();
    }
  }, [id]);

  return { teacher, loading, error };
};
