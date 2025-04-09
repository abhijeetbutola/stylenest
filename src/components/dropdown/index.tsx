import { ChevronDown, ChevronUp } from "lucide-react";
import React, { ReactNode, useEffect, useRef } from "react";

type DropdownProps = {
  data: string[]; // Array of options for the dropdown
  open: boolean; // State to indicate if the dropdown is open
  setOpen: (value: boolean) => void; // Function to toggle the dropdown's open state
  onChange: (selectedOption: string) => void; // Callback for when an option is selected
  type: "hover" | "click";
  selectedOption: string;
  children: ReactNode; // Content to display in the dropdown title
  titleClassName?: string; // Class name for the dropdown title
  optionsClassName?: string; // Class name for the dropdown options
};

const Dropdown: React.FC<DropdownProps> = ({
  data,
  open,
  setOpen,
  onChange,
  type,
  selectedOption,
  children,
  titleClassName = "",
  optionsClassName = "",
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (type === "hover") return;

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef, setOpen, type]);

  useEffect(() => {
    if (dropdownContentRef.current) {
      const rect = dropdownContentRef.current.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        dropdownContentRef.current.style.left = "auto";
        dropdownContentRef.current.style.right = "0";
      }
    }
  }, [dropdownContentRef, open]);

  const handleHoverType = (value: boolean) => {
    if (type === "hover") setOpen(value);
  };

  const handleClickType = (value: boolean) => {
    if (type === "click") setOpen(value);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative cursor-pointer"
      onMouseEnter={() => handleHoverType(true)}
      onMouseLeave={() => handleHoverType(false)}
      onClick={() => handleClickType(true)}
    >
      <div
        className={`${titleClassName} flex justify-between items-center gap-1.5`}
      >
        <div>{children}</div>
        <div>{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</div>
      </div>
      {open && (
        <div ref={dropdownContentRef} className={optionsClassName}>
          {data.map((opt, index) => (
            <div
              key={index}
              className={[
                selectedOption === opt && "!font-medium !text-indigo-700",
                "px-4 py-2 hover:bg-neutral-200 cursor-pointer font-normal text-sm",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={(e) => {
                e.stopPropagation();
                onChange(opt);
                handleClickType(false);
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
