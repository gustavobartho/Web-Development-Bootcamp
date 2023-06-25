import React from 'react';
import ReactDOM from 'react-dom';

const name = "Francis Bacon";


/* ReactDOM.render -> Render an element at the screen. The inputs are (what to show, where to show it)*/
ReactDOM.render(
    <div>
        {/* Use {} to wrap javascript expressions inside the HTML element */}
        <h1>Hello {name}</h1>
        <p>Paragraph with stuff</p>
    </div>,
    document.getElementById('root')
);