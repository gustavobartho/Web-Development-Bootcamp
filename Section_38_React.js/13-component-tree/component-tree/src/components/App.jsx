import React, { useState } from "react";
import TodoItem from "./TodoItem";

function App() {
    const [inputText, setInputText] = useState("");
    const [items, setItems] = useState([]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInputText(newValue);
    }

    const addItem = () => {
        setItems(prevItems => [...prevItems, inputText]);
        setInputText("");
    }

    const deleteItem = (index) => {
        setItems(prevValue => prevValue.filter((_, i) => i !== index))
    }

    return (
        <div className="container">
            <div className="heading">
                <h1>To-Do List</h1>
            </div>
            <div className="form">
                <input onChange={handleChange} type="text" value={inputText} />
                <button onClick={addItem}>
                    <span>Add</span>
                </button>
            </div>
            <div>
                <ul>
                    {items.map((todoItem, i) => (
                        <TodoItem
                            key={i}
                            id={i}
                            onChecked={deleteItem}
                            text={todoItem} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
