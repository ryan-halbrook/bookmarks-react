import { useState } from "react";
import Modal from "../Modal";

export default function AddBookmarkForm({ onAdd, onDismiss }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  function onName(event) {
    setName(event.target.value);
  }

  function onLink(event) {
    setLink(event.target.value);
  }

  function onTopic(event) {
    setTopic(event.target.value);
  }

  function onDescription(event) {
    setDescription(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    onAdd({
      name: name,
      link: link,
      type: topic,
      description: description,
    });
    onDismiss();
  }

  return (
    <Modal onDismiss={onDismiss}>
      <form onSubmit={onSubmit}>
        <h1>Add Bookmark</h1>

        <label htmlFor="name">Name: </label>
        <input type="text" name="name" required onChange={onName} />
        <label htmlFor="link">Link: </label>
        <input type="text" name="link" required onChange={onLink} />
        <label htmlFor="topic">Type: </label>
        <input type="text" name="topic" required onChange={onTopic} />
        <label htmlFor="description">Description: </label>
        <input type="text" name="description" onChange={onDescription} />
        <button type="button" onClick={onDismiss}>
          Cancel
        </button>
        <button id="save">Save</button>
      </form>
    </Modal>
  );
}
