import React, { useState } from "react";

function App() {
    const [contact, setContact] = useState({
        fName: "",
        lName: "",
        email: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setContact((prevValue) => {
            // var fName = prevValue.fName;
            // var lName = prevValue.lName;
            // var email = prevValue.email;

            // if (name === 'fName') fName = value;
            // if (name === 'lName') lName = value;
            // if (name === 'email') email = value;

            // return {
            //     fName: fName,
            //     lName: lName,
            //     email: email,
            // }

            return {
                ...prevValue,
                [name]: value,
            }

        });
    }

    return (
        <div className="container">
            <h1>
                Hello {contact.fName} {contact.lName}
            </h1>
            <p>{contact.email}</p>
            <form>
                <input
                    onChange={handleChange}
                    name="fName"
                    placeholder="First Name"
                    value={contact.fName} />
                <input
                    onChange={handleChange}
                    name="lName"
                    placeholder="Last Name"
                    value={contact.lName} />
                <input
                    onChange={handleChange}
                    name="email"
                    placeholder="Email"
                    value={contact.email} />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default App;
