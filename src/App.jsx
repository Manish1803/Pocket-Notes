import { useEffect, useState } from "react";
import NotePanel from "./components/NoteSection/NotePanel";
import Sidebar from "./components/SidebarSection/Sidebar";
import Context from "./Context/Context";

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hide, setHide] = useState(false);

  const [groups, setGroups] = useState(
    () => JSON.parse(localStorage.getItem("groups")) || []
  );
  const [selectedGroup, setSelectedGroup] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((is) => !is);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth > 768) {
        setHide(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        isMobile,
        setIsMobile,
        hide,
        setHide,
        groups,
        setGroups,
        selectedGroup,
        setSelectedGroup,
        isModalOpen,
        toggleModal,
      }}
    >
      <section className="app">
        {!hide && <Sidebar />}
        <NotePanel />
      </section>
    </Context.Provider>
  );
};

export default App;
