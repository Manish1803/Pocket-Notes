import CreateNewGroup from "./CreateNewGroup";
import { useContext } from "react";
import GroupItem from "./GroupItem";
import "./Sidebar.css";
import Context from "../../Context/Context";

const Sidebar = () => {
  const { isModalOpen, toggleModal, groups, hide } = useContext(Context);

  return (
    <aside className={`sidebar ${hide && "hidden"}`}>
      <h2 className="title">Pocket Notes</h2>
      {Array.isArray(groups) && groups.length > 0 && (
        <ul className="group-list">
          {groups.map((group, i) => (
            <GroupItem key={i} group={group} />
          ))}
        </ul>
      )}
      {/* <ul className="group-list">
        <GroupItem />
        <GroupItem />
      </ul> */}
      <CreateNewGroup isModalOpen={isModalOpen} toggleModal={toggleModal} />
    </aside>
  );
};

export default Sidebar;
