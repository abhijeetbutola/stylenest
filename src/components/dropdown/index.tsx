import { ChevronDown, ChevronUp } from "lucide-react";
import React, { ReactNode } from "react";

interface DropdownProps {
  data: string[]; // Array of options for the dropdown
  open: boolean; // State to indicate if the dropdown is open
  setOpen: () => void; // Function to toggle the dropdown's open state
  onChange: (selectedOption: string) => void; // Callback for when an option is selected
  children: ReactNode; // Content to display in the dropdown title
  titleClassName?: string; // Class name for the dropdown title
  optionsClassName?: string; // Class name for the dropdown options
}

const Dropdown: React.FC<DropdownProps> = ({
  data,
  open,
  setOpen,
  onChange,
  children,
  titleClassName = "",
  optionsClassName = "",
}) => {
  return (
    <div className="relative cursor-pointer">
      <div
        className={`${titleClassName} flex justify-between items-center gap-1.5`}
        onClick={setOpen}
      >
        <div>{children}</div>
        <div>{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</div>
      </div>
      {open && (
        <div className={optionsClassName}>
          {data.map((opt, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-neutral-200 cursor-pointer font-normal text-sm text-neutral-900"
              onClick={() => {
                onChange(opt);
                setOpen();
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
