import React from "react";
import Login from "./Login";

function App() {
    var isLogged = false;
    const currentTime = new Date().getHours();

    return (
        <div className="container">
            {/* isLogged ? <h1>Hello</h1> : <Login /> */}
            {/* currentTime > 12 ? <h1>Why are you still working?</h1> : null */}
            {currentTime > 12 && <h1>Why are you still working?</h1>}
        </div>
    );
}

export default App;
