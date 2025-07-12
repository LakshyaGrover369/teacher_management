import { useState } from "react";

interface QualificationsTableProps {
  qualifications: string[];
  editable?: boolean;
}

export default function QualificationsTable({
  qualifications = [],
  editable = false,
}: QualificationsTableProps) {
  const [currentQualifications, setCurrentQualifications] =
    useState(qualifications);
  const [newQualification, setNewQualification] = useState("");

  const addQualification = () => {
    if (
      newQualification.trim() &&
      !currentQualifications.includes(newQualification.trim())
    ) {
      setCurrentQualifications([
        ...currentQualifications,
        newQualification.trim(),
      ]);
      setNewQualification("");
    }
  };

  const removeQualification = (qualification: string) => {
    setCurrentQualifications(
      currentQualifications.filter((q) => q !== qualification)
    );
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Qualifications
        </h3>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {currentQualifications.map((qualification) => (
            <span
              key={qualification}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
            >
              {qualification}
              {editable && (
                <button
                  type="button"
                  className="ml-1.5 inline-flex text-indigo-600 hover:text-indigo-900 focus:outline-none"
                  onClick={() => removeQualification(qualification)}
                >
                  <span className="sr-only">Remove qualification</span>
                  &times;
                </button>
              )}
            </span>
          ))}
        </div>

        {editable && (
          <div className="flex mt-4">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Add new qualification"
              value={newQualification}
              onChange={(e) => setNewQualification(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addQualification()}
            />
            <button
              type="button"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={addQualification}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
