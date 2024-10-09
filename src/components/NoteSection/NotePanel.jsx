import { IoMdArrowRoundBack } from "react-icons/io";
import { BiSolidSend } from "react-icons/bi";
import { getFormattedTimeStamp } from "../../utils/stringUtils";

import "./NotePanel.css";
import { useCallback, useContext, useEffect, useState } from "react";
import Context from "../../Context/Context";
import Home from "../HomePage/Home";

const NotePanel = () => {
  const { selectedGroup, hide, setHide, isMobile, groups, setGroups } =
    useContext(Context);

  const { name, initial, color } = selectedGroup;

  const [notes, setNotes] = useState(selectedGroup.notes);
  const [noteText, setNoteText] = useState("");

  const handleAddNote = useCallback(() => {
    const { datePart, timePart } = getFormattedTimeStamp();

    const newNote = {
      text: noteText,
      date: datePart,
      time: timePart,
    };
    console.log(newNote);

    setNotes((prevNotes) => [...prevNotes, newNote]);

    const updatedGroups = groups.map((group) =>
      group.name === name
        ? { ...group, notes: [...group.notes, newNote] }
        : group
    );
    setGroups(updatedGroups);
    setNoteText("");
  }, [name, noteText, groups, setGroups, setNotes]);

  useEffect(() => {
    setNotes(selectedGroup.notes);
  }, [selectedGroup.notes]);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter") {
        if (noteText.trim() !== "") {
          handleAddNote();
        }
      }
    };

    window.addEventListener("keydown", handleEnter);
    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, [handleAddNote, noteText]);

  if (!selectedGroup && !isMobile) {
    return <Home />;
  }

  return (
    <section className={`note-panel ${!hide && isMobile && "hidden"}`}>
      <header className="header">
        {isMobile && (
          <button onClick={() => setHide(isMobile && false)}>
            <IoMdArrowRoundBack size="1.5rem" color="#fff" />
          </button>
        )}

        <div className="cicon" style={{ backgroundColor: color }}>
          {initial}
        </div>
        <h2 className="group-title">{name}</h2>
      </header>

      <ul className="note-list">
        {notes &&
          notes.map((note, i) => (
            <li className="note-item" key={i}>
              <p className="note-text">{note.text}</p>
              <p className="date-time">
                {note.date} &#9679; {note.time}
              </p>
            </li>
          ))}
      </ul>

      <div className="input-container">
        <textarea
          placeholder="Enter your text here..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        ></textarea>
        <button
          className="btn-add-note"
          onClick={handleAddNote}
          disabled={!noteText.trim()}
        >
          <BiSolidSend
            fill={noteText.trim() ? "#001F8B" : "#ABABAB"}
            size="1.5rem"
          />
        </button>
      </div>
    </section>
  );
};

export default NotePanel;
