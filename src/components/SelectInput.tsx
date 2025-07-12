import { useState } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  options: SelectOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SelectInput({
  options,
  selectedValue,
  onChange,
  placeholder = "Select an option",
  className = "",
}: SelectInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block truncate">
          {selectedOption?.label || placeholder}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {options.map((option) => (
            <li
              key={option.value}
              className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-100"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <span className="block truncate">{option.label}</span>
              {selectedValue === option.value && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                  ✓
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
