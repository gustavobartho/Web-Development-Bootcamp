import React from 'react';

function Loader(props) {
    const { hidden } = props;

    return (
        <div hidden={hidden} className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default Loader;