import React, { useState } from "react";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';


function CreateArea(props) {
    const [note, setNote] = useState({ title: "", content: "" });
    const [expanded, setExpanded] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    }

    const submitNote = (event) => {
        event.preventDefault();
        if (!note.title.length || !note.content.length) return;
        props.onAdd(note);
        setNote({
            title: "",
            content: ""
        });
    }


    return (
        <div onClick={() => setExpanded(true)}>
            <form className="create-note">
                {expanded && <input
                    name="title"
                    onChange={handleChange}
                    value={note.title}
                    placeholder="Title"
                />}
                <textarea
                    name="content"
                    onChange={handleChange}
                    value={note.content}
                    placeholder="Take a note..."
                    rows={expanded ? 3 : 1}
                />
                <Zoom in={expanded}>
                    <Fab onClick={submitNote}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
