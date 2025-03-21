import { useAppDispatch, useAppSelector } from "../../hooks";
import Button from "../button";
import closeIcon from "../../assets/closeicon.svg";
import FilterSection from "../filter-section";
import { toggleSidebar } from "../../redux/slices/contextualSidebarSlice";

function ContextualSidebar() {
  const sidebarOpen = useAppSelector((state) => state.contextualSidebar.open);
  const dispatch = useAppDispatch();
  return (
    <>
      {sidebarOpen && (
        <div
          className="bg-black/50 fixed inset-0 z-[996]"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}
      <div
        className={`lg:hidden fixed left-0 bg-white w-full max-w-[359px] h-full -translate-x-full z-[997] transition-all p-6 ${
          sidebarOpen ? "translate-x-0" : ""
        }`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <span className="text-neutral-900 text-xl font-normal">Filter</span>
            <Button type="button" onClick={() => dispatch(toggleSidebar())}>
              <img src={closeIcon} alt="" />
            </Button>
          </div>
          <hr className="border-t-[1px] border-neutral-300" />
          <FilterSection />
        </div>
      </div>
    </>
  );
}

export default ContextualSidebar;
