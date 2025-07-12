import { useState } from "react";
import MainLayout from "../../components/MainLayout";
import TeacherList from "../../components/TeacherList";
import { useTeachers } from "../../hooks/useTeachers";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import ToastNotification from "../../components/ToastNotification";

const TeachersPage = () => {
  const { teachers, loading, error, removeTeacher } = useTeachers();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const filterOptions = [
    { value: "all", label: "All Teachers" },
    { value: "head", label: "Head Teachers" },
    { value: "contemporary", label: "Contemporary" },
  ];

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterValue === "all" ||
      (filterValue === "head" && teacher.meta?.headCount) ||
      (filterValue === "contemporary" && teacher.meta?.contemporary);

    return matchesSearch && matchesFilter;
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteTeacher = async (id: string) => {
    try {
      await removeTeacher(id);
      setNotification({
        message: "Teacher deleted successfully",
        type: "success",
      });
      if (currentPage > 1 && paginatedTeachers.length === 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      setNotification({
        message:
          err instanceof Error ? err.message : "Failed to delete teacher",
        type: "error",
      });
    }
  };

  return (
    <MainLayout title="Teachers">
      {notification && (
        <div className="fixed top-4 right-4 z-50">
          <ToastNotification
            message={notification.message}
            type={notification.type}
            onDismiss={() => setNotification(null)}
          />
        </div>
      )}

      {loading && !teachers.length ? (
        <LoadingSkeleton />
      ) : (
        <TeacherList
          teachers={paginatedTeachers}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterValue={filterValue}
          onFilterChange={setFilterValue}
          filterOptions={filterOptions}
          onDeleteTeacher={handleDeleteTeacher}
        />
      )}
    </MainLayout>
  );
};

export default TeachersPage;
