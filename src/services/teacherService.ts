import { Teacher } from "../types/teacher";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchTeachers = async (): Promise<Teacher[]> => {
  const response = await fetch(`${API_URL}/teachers`);
  if (!response.ok) {
    throw new Error("Failed to fetch teachers");
  }
  return response.json();
};

export const fetchTeacherById = async (id: string): Promise<Teacher> => {
  const response = await fetch(`${API_URL}/teachers/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch teacher with ID ${id}`);
  }
  return response.json();
};

export const createTeacher = async (
  teacherData: Partial<Teacher>
): Promise<Teacher> => {
  const response = await fetch(`${API_URL}/teachers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teacherData),
  });
  if (!response.ok) {
    throw new Error("Failed to create teacher");
  }
  return response.json();
};

export const updateTeacher = async (
  id: string,
  teacherData: Partial<Teacher>
): Promise<Teacher> => {
  const response = await fetch(`${API_URL}/teachers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teacherData),
  });
  if (!response.ok) {
    throw new Error(`Failed to update teacher with ID ${id}`);
  }
  return response.json();
};

export const deleteTeacher = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/teachers/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete teacher with ID ${id}`);
  }
};
