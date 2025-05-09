import "./App.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";
import { loadAuthFromLocalStorage } from "./utils/authLocalStorageUtils";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { rehydrate } from "./redux/slices/authSlice";
import { useLocation } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import MainSidebar from "./components/main-sidebar";
import { HelmetProvider } from "react-helmet-async";
import ContextualSidebar from "./components/contextual-sidebar";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const authData = loadAuthFromLocalStorage();
    if (authData) {
      dispatch(rehydrate(authData));
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.key]);

  const isNotFoundPage = location.pathname === "/not-found-page";

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <HelmetProvider>
      <div className="w-full shadow-inner">
        <MainSidebar open={sidebarOpen} handleClose={handleSidebarClose} />
        <ContextualSidebar />
        {!isNotFoundPage && <Navbar sidebarOpen={handleSidebarOpen} />}
        <div className="flex justify-center rounded-t-lg">
          <Outlet />
          <ToastContainer
            // className={``}
            position="bottom-center"
            transition={Zoom}
            closeButton={false}
            hideProgressBar
            stacked
          />
        </div>
        {!isNotFoundPage && (
          <div className="w-full flex justify-center items-start">
            <Footer />
          </div>
        )}
      </div>
    </HelmetProvider>
  );
}

export default App;
