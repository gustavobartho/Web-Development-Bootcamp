import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import NOTES from "../notes";

function App() {
    return (
        <div>
            <Header />
            {NOTES.map(noteData => (
                <Note
                    key={noteData.key}
                    title={noteData.title}
                    content={noteData.content}
                />
            ))}
            <Footer />
        </div>
    );
}

export default App;
