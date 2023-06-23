import React from 'react';


function TodoItem(props) {
    return (
        <li
            style={{ cursor: 'pointer' }}
            onClick={() => props.onChecked(props.id)}
        >{props.text}</li>
    );
}

export default TodoItem;