export interface AvailabilitySlot {
  day: string;
  times: string[];
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone?: string;
  qualifications: string[];
  availability: AvailabilitySlot[];
  meta?: {
    headCount?: number;
    contemporary?: boolean;
    hybrid?: boolean;
    highLevel?: boolean;
    inferior?: boolean;
  };
}

export interface TeacherListProps {
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
