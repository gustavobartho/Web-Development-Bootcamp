import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper {
  // creates a new data type - like a interface in js
  public type Note = {
    title : Text;
    content : Text;
  };

  // creates an empty array of Note objects
  stable var notes : List.List<Note> = List.nil<Note>();

  public func createNote(newTitle : Text, newContent : Text) {
    // creates the new Note
    let newNote : Note = {
      title = newTitle;
      content = newContent;
    };

    // append the new note to the begining of the notes list
    notes := List.push(newNote, notes);

    Debug.print(debug_show (notes));
  };

  public query func readNotes() : async [Note] {
    return List.toArray(notes);
  };

  public func deleteNote(id : Nat) {
    // removes the item at index id by getting the firt items to id and the last items from id +1 and joining them with append
    notes := List.append(List.take(notes, id), List.drop(notes, id + 1));
  };
};
