import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useState } from "react";

function App() {
    const [reminders, setReminders] = useState([]);

    const addReminder = (note) => {
        setReminders(prevValue => [...prevValue, note]);
    }

    const deleteReminder = (index) => {
        setReminders(prevValue => prevValue.filter((_, i) => i !== index));
    }

    return (
        <div>
            <Header />
            <CreateArea onAddReminder={addReminder} />
            {reminders.map((note, i) => (
                <Note
                    onDeleteItem={deleteReminder}
                    key={i}
                    id={i}
                    title={note.title}
                    content={note.content} />
            ))}
            <Footer />
        </div>
    );
}

export default App;
