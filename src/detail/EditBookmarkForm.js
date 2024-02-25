import { useState } from "react";
import Modal from "../Modal";
import css from "./EditBookmarkForm.module.css";

export default function EditBookmarkForm({ bookmark, onEdit, onDismiss }) {
  const [updatedBookmark, setUpdatedBookmark] = useState(bookmark);

  function onSubmit(event) {
    event.preventDefault();
    // Backend just takes a string for 'type' field.
    if (Object.hasOwn(updatedBookmark, "type")) {
      let type = updatedBookmark.type;
      if (Object.hasOwn(type, "name")) {
        updatedBookmark.type = type.name;
      }
    }
    onEdit(updatedBookmark);
    onDismiss();
  }

  function onName(event) {
    let name = event.target.value;
    setUpdatedBookmark({ ...updatedBookmark, name: name });
  }

  function onLink(event) {
    let link = event.target.value;
    setUpdatedBookmark({ ...updatedBookmark, link: link });
  }

  function onType(event) {
    let type = event.target.value;
    setUpdatedBookmark({ ...updatedBookmark, type: type });
  }

  function onDescription(event) {
    let description = event.target.value;
    setUpdatedBookmark({ ...updatedBookmark, description: description });
  }

  return (
    <Modal onDismiss={onDismiss}>
      <form onSubmit={onSubmit}>
        <h1>Edit Bookmark</h1>
        <label htmlFor="name">Name: </label>
        <div>
          <p className={css.currentValue}>{bookmark.name}</p>
          <input type="text" name="name" onChange={onName} />
        </div>
        <label htmlFor="link">Link: </label>
        <div>
          <p className={css.currentValue}>{bookmark.link}</p>
          <input type="text" name="link" onChange={onLink} />
        </div>
        <label htmlFor="type">Type: </label>
        <div>
          <p className={css.currentValue}>{bookmark.type.name}</p>
          <input type="text" name="type" onChange={onType} />
        </div>
        <label htmlFor="description">Description: </label>
        <div>
          <p className={css.currentValue}>{bookmark.description}</p>
          <input type="text" name="description" onChange={onDescription} />
        </div>
        <button type="button" onClick={onDismiss}>
          Cancel
        </button>
        <button id="save">Save</button>
      </form>
    </Modal>
  );
}
