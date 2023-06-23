import React from "react";
import { useState } from "react";

function App() {
    const [inputText, setInputText] = useState("");
    const [todoList, setTodoList] = useState(["A Item"])

    const handleChange = (event) => {
        const { value } = event.target;
        setInputText(value);
    }

    const handleClick = () => {
        setTodoList(prevValue => [...prevValue, inputText]);
        setInputText("")
    }

    return (
        <div className="container">
            <div className="heading">
                <h1>To-Do List</h1>
            </div>
            <div className="form">
                <input
                    onChange={handleChange}
                    type="text"
                    value={inputText} />
                <button onClick={handleClick}>
                    <span>Add</span>
                </button>
            </div>
            <div>
                <ul>
                    {todoList.map(item => (
                        <li>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
