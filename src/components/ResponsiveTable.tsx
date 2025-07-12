import { ReactNode } from "react";

interface TableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface ResponsiveTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage?: string;
  className?: string;
}

export default function ResponsiveTable<T>({
  columns,
  data,
  emptyMessage = "No data available",
  className = "",
}: ResponsiveTableProps<T>) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <div className="inline-block min-w-full align-middle">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">{emptyMessage}</div>
        ) : (
          <>
            {/* Desktop table */}
            <table className="min-w-full divide-y divide-gray-200 hidden md:table">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        column.className || ""
                      }`}
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((column) => (
                      <td
                        key={`${rowIndex}-${column.key}`}
                        className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${
                          column.className || ""
                        }`}
                      >
                        {column.render(row)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile cards */}
            <div className="space-y-4 md:hidden">
              {data.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="bg-white shadow overflow-hidden rounded-lg"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="space-y-4">
                      {columns.map((column) => (
                        <div key={`mobile-${rowIndex}-${column.key}`}>
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {column.header}
                          </div>
                          <div className="mt-1 text-sm text-gray-900">
                            {column.render(row)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
