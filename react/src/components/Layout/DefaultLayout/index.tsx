import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import HeaderSection from "./Header";

export default function DefaultLayout() {
  const { user, token } = useStateContext();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const toggleSidebar = () => {
    if (window.innerWidth > 1024) {
      setIsOpen(false);
    } else {
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onLogout = () => {
    console.log("first");
  };

  const toggleProfileDrawer = () => {
    setIsOpenDrawer(!isOpenDrawer);
    console.log(isOpenDrawer);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      drawerRef.current &&
      !drawerRef.current.contains(event.target as Node)
    ) {
      setIsOpenDrawer(false);
    }
    if (
      window.innerWidth <= 768 &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  return (
    <div id="defaultLayout">
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        sidebarRef={sidebarRef}
      />
      <div className={`content ${isOpen ? "" : "shifted"}`}>
        <HeaderSection
          isOpenDrawer={isOpenDrawer}
          drawerRef={drawerRef}
          toggleSidebar={toggleSidebar}
          toggleProfileDrawer={toggleProfileDrawer}
          user={user}
          onLogout={onLogout}
        />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
