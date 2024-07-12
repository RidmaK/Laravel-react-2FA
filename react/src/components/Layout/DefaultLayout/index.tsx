import { Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import HeaderSection from "./Header";
import axiosClient from "../../../axios-client";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();
  const [isOpen, setIsOpen] = useState<boolean>(window.innerWidth > 768);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onLogout = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    ev.preventDefault();

    axiosClient.post('/logout')
      .then(() => {
        setUser({
          name: "",
        });
        setToken(null);
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
  };

  useEffect(() => {
    axiosClient.get('/get-user')
      .then(({data}) => {
         setUser(data?.user)
      })
  }, [])

  const toggleProfileDrawer = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
      setIsOpenDrawer(false);
    }
    if (window.innerWidth <= 768 && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <div id="defaultLayout">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} sidebarRef={sidebarRef} />
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
