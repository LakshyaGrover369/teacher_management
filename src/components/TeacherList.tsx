import { Teacher } from "../types/teacher";
import TeacherCard from "./TeacherCard";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import Pagination from "./Pagination";
import EmptyState from "./EmptyState";

interface TeacherListProps {
  teachers: Teacher[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
  filterOptions: { value: string; label: string }[];
  onDeleteTeacher: (id: string) => Promise<void>;
}

export default function TeacherList({
  teachers,
  currentPage,
  totalPages,
  onPageChange,
  searchTerm,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions,
}: TeacherListProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={onSearchChange} />
        <div className="flex space-x-4">
          <FilterDropdown
            options={filterOptions}
            selectedValue={filterValue}
            onSelect={onFilterChange}
            label="Filter"
          />
        </div>
      </div>

      {teachers.length === 0 ? (
        <EmptyState
          title="No teachers found"
          description="Try adjusting your search or filter criteria"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
