import { useRouter } from "next/router";
import MainLayout from "@/components/MainLayout";
import TeacherDetail from "@/components/TeacherDetails";
import { useTeacher } from "@/hooks/useTeacher";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import EmptyState from "@/components/EmptyState";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

const TeacherDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { teacher, loading, error } = useTeacher(id as string);

  return (
    <MainLayout title={teacher?.name ?? "Teacher Details"}>
      <Breadcrumbs
        items={[
          { name: "Teachers", href: "/teachers", current: false },
          { name: teacher?.name || "Details", href: "#", current: true },
        ]}
      />

      {loading && !teacher ? (
        <LoadingSkeleton />
      ) : error ? (
        <EmptyState
          title="Error loading teacher"
          description={error}
          actionText="Back to Teachers"
          onAction={() => router.push("/teachers")}
        />
      ) : teacher ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {teacher?.name ?? "Unknown"}
            </h1>
            <Link
              href={`/teachers/${teacher.id}/edit`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit Teacher
            </Link>
          </div>
          <TeacherDetail teacher={teacher} />
        </div>
      ) : (
        <EmptyState
          title="Teacher not found"
          description="The requested teacher could not be found"
          actionText="Back to Teachers"
          onAction={() => router.push("/teachers")}
        />
      )}
    </MainLayout>
  );
};

export default TeacherDetailPage;
