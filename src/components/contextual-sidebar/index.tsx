import { useAppSelector } from "../../hooks";

function ContextualSidebar() {
  const sidebarOpen = useAppSelector((state) => state.contextualSidebar.open);
  return (
    <div
      className={`lg:hidden fixed left-0 bg-white w-40 h-full -translate-x-full ${
        sidebarOpen ? "translate-x-0" : ""
      }`}
    >
      Contextual Sidebar
    </div>
  );
}

export default ContextualSidebar;
