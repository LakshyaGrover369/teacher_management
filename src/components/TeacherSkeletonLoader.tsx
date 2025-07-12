export default function TeacherSkeletonLoader() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 rounded-full bg-gray-200"></div>
          </div>
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div>
            <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="flex flex-wrap gap-1">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>

        <div className="mt-4 h-10 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
}
