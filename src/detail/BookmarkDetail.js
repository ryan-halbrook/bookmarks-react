import BookmarkTags from "./BookmarkTags";
import Modal from "../Modal";
import AddTagForm from "./AddTagForm";
import EditBookmark from "./EditBookmark";
import ConfirmDialog from "../ConfirmDialog";
import css from "./BookmarkDetail.module.css";
import { useState } from "react";
import { addTag } from "../client";

export default function BookmarkDetail({
  collectionId,
  bookmarks,
  bookmark,
  onSelectBookmark,
  onUpdateBookmark,
  onDeleteBookmark,
}) {
  const [addTagShowing, setAddTagShowing] = useState(false);
  const [deleteShowing, setDeleteShowing] = useState(false);

  function showDeleteModal() {
    setDeleteShowing(true);
  }

  function onDismissDelete() {
    setDeleteShowing(false);
  }

  function addTagHandler() {
    setAddTagShowing(true);
  }

  function onDismissAddTag() {
    setAddTagShowing(false);
  }

  function onTagSaved(tag) {
    setAddTagShowing(false);
    addTag(bookmark.id, tag.id);
  }

  function handleEditBookmark(updatedBookmark) {
    onUpdateBookmark(collectionId, bookmark.id, updatedBookmark);
  }

  return (
    <div className={css.detail}>
      {addTagShowing && (
        <Modal onDismiss={onDismissAddTag}>
          <AddTagForm
            collectionId={collectionId}
            bookmarks={bookmarks}
            bookmark={bookmark}
            onTagSaved={onTagSaved}
            onDismiss={onDismissAddTag}
          />
        </Modal>
      )}
      {deleteShowing && (
        <Modal onDismiss={onDismissDelete}>
          <ConfirmDialog
            onConfirm={() => onDeleteBookmark(collectionId, bookmark.id)}
            onCancel={onDismissDelete}
          >
            Are you sure you want to delete the bookmark?
          </ConfirmDialog>
        </Modal>
      )}
      <h1>
        <a
          className={css.link}
          href={bookmark.link}
          target="_blank"
          rel="noreferrer"
        >
          {bookmark.name}
        </a>
      </h1>
      <p className={css.typeLabel}>:{bookmark.type.name}</p>
      <div style={{ display: "flex" }}>
        <EditBookmark bookmark={bookmark} onEdit={handleEditBookmark} />
        {/* <EditBookmarkForm bookmark={bookmark} onSave={() => {}} onDismiss={() => {}}/> */}
        <button
          className={css.deleteButton}
          onClick={showDeleteModal}
          style={{ margin: "0px 0px 0px 10px" }}
        >
          Delete
        </button>
      </div>
      <p>{bookmark.description}</p>
      {/* <p style={{color: '#777'}}>Created: {Date.parse(bookmark.created).toLocaleString()}</p> */}
      <p style={{ color: "#555", fontSize: "10pt", paddingTop: "10px" }}>
        Created: {bookmark.created}
      </p>
      <p style={{ color: "#009", fontSize: "10pt" }}>Id: {bookmark.id}</p>
      {bookmark.note && (
        <div>
          <h3>Note</h3>
          <p>{bookmark.note}</p>
        </div>
      )}
      <BookmarkTags
        bookmark={bookmark}
        onAddTag={addTagHandler}
        onSelectBookmark={onSelectBookmark}
      />
      <button className={css.deleteButton} onClick={showDeleteModal}>
        Delete
      </button>
    </div>
  );
}
