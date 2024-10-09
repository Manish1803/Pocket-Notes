import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Context from "../../Context/Context";
import { getInitials } from "../../utils/stringUtils";
import { v4 as uuid } from "uuid";

const ColorsContainer = ({ colors, selectedColor, onSelectedColor }) => {
  return (
    <div className="colors-container">
      {colors.map((color, i) => (
        <div
          key={i}
          className={`circle ${selectedColor === color ? "selected" : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => onSelectedColor(color)}
        ></div>
      ))}
    </div>
  );
};

const CreateNewGroup = () => {
  const { isModalOpen, toggleModal, setGroups } = useContext(Context);

  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("");

  const circleColors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const handleAddGroup = (e) => {
    e.preventDefault();

    const initial = getInitials(groupName);

    if (groupName && groupColor) {
      const newGroup = {
        id: uuid(),
        name: groupName,
        color: groupColor,
        initial: initial,
        notes: [],
      };

      console.log(newGroup);
      setGroups((prevGroups) =>
        Array.isArray(prevGroups) ? [...prevGroups, newGroup] : [newGroup]
      );

      setGroupName("");
      setGroupColor("");
      toggleModal();
    }
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("overlay")) {
      e.stopPropagation();
      toggleModal();

      setGroupName("");
      setGroupColor("");
    }
  };

  return (
    <>
      <button className="btn-new-group" onClick={toggleModal}>
        <FaPlus color="#fff" size="2rem" />
      </button>
      {isModalOpen && (
        <div className="overlay" onClick={handleCloseModal}>
          <article
            className="new-group-modal"
            onSubmit={(e) => handleAddGroup(e)}
          >
            <h2>Create New Group</h2>
            <form className="form">
              <label htmlFor="group-name">Group Name</label>
              <input
                type="text"
                placeholder="Enter group name"
                id="group-name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <label htmlFor="choose-color">Choose Colour</label>
              <ColorsContainer
                colors={circleColors}
                selectedColor={groupColor}
                onSelectedColor={setGroupColor}
              />
              <button className="btn-create-group" type="submit">
                Create
              </button>
            </form>
          </article>
        </div>
      )}
    </>
  );
};

export default CreateNewGroup;
