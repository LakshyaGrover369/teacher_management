import { useRouter } from "next/router";
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import TeacherForm from "@/components/TeacherForm";
import { useTeacher } from "@/hooks/useTeacher";
import { useTeachers } from "@/hooks/useTeachers";
import ToastNotification from "@/components/ToastNotification";
import Breadcrumbs from "@/components/Breadcrumbs";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import type { Teacher } from "@/types/teacher";

const EditTeacherPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { teacher, loading } = useTeacher(id as string);
  const { editTeacher } = useTeachers();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = async (teacherData: Partial<Teacher>) => {
    try {
      await editTeacher(id as string, teacherData);
      setNotification({
        message: "Teacher updated successfully",
        type: "success",
      });
      setTimeout(() => {
        router.push(`/teachers/${id}`);
      }, 1000);
    } catch (err) {
      setNotification({
        message:
          err instanceof Error ? err.message : "Failed to update teacher",
        type: "error",
      });
    }
  };

  const handleCancel = () => {
    router.push(`/teachers/${id}`);
  };

  if (loading || !teacher) {
    return (
      <MainLayout title="Edit Teacher">
        <LoadingSkeleton />
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`Edit ${teacher.name}`}>
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
          { name: teacher.name, href: `/teachers/${id}`, current: false },
          { name: "Edit", href: "#", current: true },
        ]}
      />

      <div className="max-w-3xl mx-auto bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Edit Teacher
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <TeacherForm
            initialData={teacher}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default EditTeacherPage;
