import { useState } from "react";
import { AvailabilitySlot } from "../types/teacher";

interface AvailabilityCalendarProps {
  availability: AvailabilitySlot[];
  editable?: boolean;
}

export default function AvailabilityCalendar({
  availability = [],
  editable = false,
}: AvailabilityCalendarProps) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const timeSlots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];

  const [currentAvailability, setCurrentAvailability] = useState(() => {
    const initialAvailability: Record<string, boolean[]> = {};
    days.forEach((day) => {
      initialAvailability[day] = timeSlots.map((time) =>
        availability.some(
          (slot) => slot.day === day && slot.times.includes(time)
        )
      );
    });
    return initialAvailability;
  });

  const toggleSlot = (day: string, slotIndex: number) => {
    if (!editable) return;

    setCurrentAvailability((prev) => ({
      ...prev,
      [day]: prev[day].map((val, i) => (i === slotIndex ? !val : val)),
    }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            {days.map((day) => (
              <th
                key={day}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {day.substring(0, 3)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {timeSlots.map((time, timeIndex) => (
            <tr key={time}>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {time}
              </td>
              {days.map((day) => (
                <td
                  key={`${day}-${time}`}
                  className="px-4 py-4 whitespace-nowrap text-center"
                >
                  <button
                    onClick={() => toggleSlot(day, timeIndex)}
                    className={`w-6 h-6 rounded-sm ${
                      currentAvailability[day][timeIndex]
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-200 hover:bg-gray-300"
                    } transition-colors`}
                    aria-label={`${
                      currentAvailability[day][timeIndex]
                        ? "Available"
                        : "Unavailable"
                    } at ${time} on ${day}`}
                    disabled={!editable}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
