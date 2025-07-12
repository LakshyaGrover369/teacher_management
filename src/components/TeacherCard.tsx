import { Teacher } from "../types/teacher";
import Link from "next/link";

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 font-medium">
                {teacher.name.charAt(0)}
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {teacher.name}
            </h3>
            <p className="text-gray-500 text-sm">{teacher.email}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </h4>
            <p className="text-gray-900">{teacher.phone || "Not provided"}</p>
          </div>
          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Qualifications
            </h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {teacher.qualifications.slice(0, 3).map((q) => (
                <span
                  key={q}
                  className="px-2 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700"
                >
                  {q}
                </span>
              ))}
              {teacher.qualifications.length > 3 && (
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                  +{teacher.qualifications.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        <Link href={`/teachers/${teacher.id}`}>
          <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
