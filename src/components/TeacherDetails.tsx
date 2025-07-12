import { Teacher } from "../types/teacher";
import AvailabilityCalendar from "./AvailabilityCalendar";
import QualificationsTable from "./QualificationsTable";
import Badge from "./Badge";
import { formatPhoneNumber } from "../utils/helpers";

interface TeacherDetailsProps {
  teacher: Teacher;
  editable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TeacherDetails({
  teacher,
  editable = false,
  onEdit,
  onDelete,
}: TeacherDetailsProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      {/* Header section */}
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Teacher Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal details and availability
            </p>
          </div>
          {editable && (
            <div className="flex space-x-3">
              <button
                onClick={onEdit}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="px-4 py-5 sm:p-6">
        {/* Personal Information */}
        <div className="mb-8">
          <h4 className="text-md font-medium text-gray-900 mb-4">
            Personal Information
          </h4>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div>
              <h5 className="text-sm font-medium text-gray-500">Full Name</h5>
              <p className="mt-1 text-sm text-gray-900">{teacher.name}</p>
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-500">Email</h5>
              <p className="mt-1 text-sm text-gray-900">{teacher.email}</p>
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-500">Phone</h5>
              <p className="mt-1 text-sm text-gray-900">
                {teacher.phone
                  ? formatPhoneNumber(teacher.phone)
                  : "Not provided"}
              </p>
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-500">Status</h5>
              <div className="mt-1">
                <Badge text="Active" color="green" size="sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Qualifications */}
        <div className="mb-8">
          <h4 className="text-md font-medium text-gray-900 mb-4">
            Qualifications
          </h4>
          <QualificationsTable
            qualifications={teacher.qualifications}
            editable={editable}
          />
        </div>

        {/* Meta Information */}
        {teacher.meta && (
          <div className="mb-8">
            <h4 className="text-md font-medium text-gray-900 mb-4">
              Additional Information
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {teacher.meta.headCount && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="text-sm font-medium text-gray-500">
                    Head Count
                  </h5>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {teacher.meta.headCount}
                  </p>
                </div>
              )}
              {teacher.meta.contemporary && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="text-sm font-medium text-gray-500">
                    Contemporary
                  </h5>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    <Badge text="Yes" color="green" size="sm" />
                  </p>
                </div>
              )}
              {teacher.meta.hybrid && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="text-sm font-medium text-gray-500">Hybrid</h5>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    <Badge text="Yes" color="green" size="sm" />
                  </p>
                </div>
              )}
              {teacher.meta.inferior && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="text-sm font-medium text-gray-500">
                    Inferior
                  </h5>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    <Badge text="Yes" color="green" size="sm" />
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Availability */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-4">
            Availability
          </h4>
          <AvailabilityCalendar
            availability={teacher.availability}
            editable={editable}
          />
        </div>
      </div>
    </div>
  );
}
