import { useContext } from "react";
import Context from "../../Context/Context";

const GroupItem = ({ group }) => {
  const { isMobile, setHide, setSelectedGroup, selectedGroup } =
    useContext(Context);

  const handleGroupClick = () => {
    console.log(group);
    setSelectedGroup(group);
    if (isMobile) {
      setHide(true);
    }
  };

  return (
    <li
      className={`group-item ${
        selectedGroup?.id === group.id ? "gselected" : ""
      }`}
      onClick={handleGroupClick}
    >
      <div className="cicon" style={{ backgroundColor: group?.color }}>
        {group?.initial}
      </div>
      <h3>{group.name}</h3>
    </li>
  );
};

export default GroupItem;
