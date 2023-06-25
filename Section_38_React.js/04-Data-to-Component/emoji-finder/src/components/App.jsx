import React from "react";
import Entry from "./Entry";
import EMOJIPEDIA from "../emojipedia";

function App() {
  const createEntry = (emojiData) => {
    return <Entry
      key={emojiData.id}
      emoji={emojiData.emoji}
      name={emojiData.name}
      meaning={emojiData.meaning}
    />
  }

  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      <dl className="dictionary">
        {EMOJIPEDIA.map(createEntry)}
      </dl>
    </div>
  );
}

export default App;
