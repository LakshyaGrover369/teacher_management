import { useState } from "react";
import { useRouter } from "next/router";
import MainLayout from "../../components/MainLayout";
import TeacherForm from "../../components/TeacherForm";
import { useTeachers } from "../../hooks/useTeachers";
import ToastNotification from "../../components/ToastNotification";
import Breadcrumbs from "../../components/Breadcrumbs";
import type { Teacher } from "../../types/teacher"; // Add this line

const NewTeacherPage = () => {
  const router = useRouter();
  const { addTeacher } = useTeachers();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = async (teacherData: Partial<Teacher>) => {
    try {
      const newTeacher = await addTeacher(teacherData);
      setNotification({
        message: "Teacher created successfully",
        type: "success",
      });
      setTimeout(() => {
        router.push(`/teachers/${newTeacher.id}`);
      }, 1000);
    } catch (err) {
      setNotification({
        message:
          err instanceof Error ? err.message : "Failed to create teacher",
        type: "error",
      });
    }
  };

  const handleCancel = () => {
    router.push("/teachers");
  };

  return (
    <MainLayout title="Add New Teacher">
      {notification && (
        <div className="fixed top-4 right-4 z-50">
          <ToastNotification
            message={notification.message}
            type={notification.type}
            onDismiss={() => setNotification(null)}
          />
        </div>
      )}

      <Breadcrumbs
        items={[
          { name: "Teachers", href: "/teachers", current: false },
          { name: "Add New", href: "#", current: true },
        ]}
      />

      <div className="max-w-3xl mx-auto bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Add New Teacher
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <TeacherForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
      </div>
    </MainLayout>
  );
};

export default NewTeacherPage;
