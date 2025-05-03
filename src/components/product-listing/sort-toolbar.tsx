import Dropdown from "../dropdown";
import filterIcon from "../../assets/icons/filtericon.svg";
import { useState } from "react";
import { sortOptions } from "./sort-options";
import Button from "../button";

export type SortKey = keyof typeof sortOptions;

interface SortToolbarProps {
  sortKey: SortKey;
  setSortKey: (key: SortKey) => void;
  toggleSidebar: () => void;
}

export function SortToolbar({
  sortKey,
  setSortKey,
  toggleSidebar,
}: SortToolbarProps) {
  const [open, setOpen] = useState(false);
  const options = Object.keys(sortOptions) as SortKey[];
  return (
    <div className="flex justify-between items-center text-neutral-900 font-medium text-sm lg:ml-auto">
      {/* mobile filter button */}
      <Button
        className="lg:hidden flex gap-2 items-center shadow-md rounded-md py-2.5 px-4 cursor-pointer"
        onClick={toggleSidebar}
      >
        <img src={filterIcon} />
        <span>Filter</span>
      </Button>

      {/* sort dropdown */}
      <Dropdown
        data={options}
        type="hover"
        open={open}
        setOpen={setOpen}
        onChange={setSortKey}
        selectedOption={sortKey}
        titleClassName="shadow-md rounded-md py-2.5 px-4"
        optionsClassName="flex flex-col border-[1.5px] absolute w-[228px] top-9 bg-white max-h-60 overflow-y-auto rounded-md shadow-lg z-50"
      >
        {sortKey}
      </Dropdown>
    </div>
  );
}
