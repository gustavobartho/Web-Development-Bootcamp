import React from "react";
import { useState } from "react";

function App() {
    const [headingText, setHeadingText] = useState('Hello');
    const [buttonStyle, setButtonStyle] = useState(null);
    const [userText, setUserText] = useState();

    const handleClick = () => {
        setHeadingText(`Hello, ${userText}`);
    }

    const changeButtonColor = (over) => {
        if (over) setButtonStyle({ backgroundColor: 'black', color: 'white' })
        else setButtonStyle(null)
    }

    const handleChange = (event) => {
        setUserText(event.target.value);
    }

    return (
        <div className="container">
            <h1>{headingText}</h1>
            <input
                onChange={handleChange}
                type="text"
                placeholder="What's your name?"
                value={userText} />
            <button
                style={buttonStyle}
                onMouseOut={() => changeButtonColor(false)}
                onMouseOver={() => changeButtonColor(true)}
                onClick={handleClick}>Submit</button>
        </div>
    );
}

export default App;
