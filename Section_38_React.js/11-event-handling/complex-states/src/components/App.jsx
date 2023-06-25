import React from "react";
import { useState } from "react";

function App() {
    const [fullName, setFullName] = useState({
        fName: "",
        lName: "",
    });

    const handleChange = (event) => {
        const inputSource = event.target.name;
        if (inputSource === 'fName') setFirstName(event);
        if (inputSource === 'lName') setLastName(event);
    }

    const setFirstName = (event) => {
        setFullName({
            fName: event.target.value,
            lName: fullName.lName,
        })
    }

    const setLastName = (event) => {
        setFullName({
            fName: fullName.fName,
            lName: event.target.value,
        })
    }

    return (
        <div className="container">
            <h1>Hello, {fullName.fName} {fullName.lName}</h1>
            <form>
                <input
                    onChange={handleChange}
                    name="fName"
                    placeholder="First Name"
                    value={fullName.fName} />
                <input
                    onChange={handleChange}
                    name="lName"
                    placeholder="Last Name"
                    value={fullName.lName} />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default App;
