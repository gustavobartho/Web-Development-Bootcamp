import React from "react";
import { useState } from "react";

function CreateArea(props) {
    const [noteData, setNoteData] = useState({ title: "", content: "" });

    const addReminder = (event) => {
        props.onAddReminder(noteData);
        setNoteData({ title: "", content: "" });
        event.preventDefault();
    }

    const handleTextChange = (event) => {
        const { name, value } = event.target;
        setNoteData(prevValue => ({ ...prevValue, [name]: value }));
    }

    return (
        <div>
            <form onSubmit={addReminder}>
                <input
                    onChange={handleTextChange}
                    name="title"
                    placeholder="Title"
                    value={noteData.title} />
                <textarea
                    onChange={handleTextChange}
                    name="content"
                    placeholder="Take a note..."
                    rows="3"
                    value={noteData.content} />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default CreateArea;
