import css from "./BookmarkTag.module.css";

export default function BookmarkTag({
  tag,
  onSelectBookmark,
  onDeleteTag,
  isEditing = false,
}) {
  function EditTagComponent({ tag }) {
    return (
      <button
        style={{ margin: "0px 0px 0px 20px" }}
        onClick={() => onDeleteTag(tag)}
      >
        Delete
      </button>
    );
  }

  return (
    <div className={css.tag}>
      <div>
        <a
          className={css.name}
          href={tag.bookmark.link}
          target="_blank"
          rel="noreferrer"
        >
          {tag.bookmark.name}
        </a>
        {isEditing && <EditTagComponent tag={tag} />}
      </div>

      <div>
        <button
          style={{ margin: "8px 0px 0px 0px" }}
          onClick={() => onSelectBookmark(tag.bookmark)}
        >
          Detail
        </button>
      </div>
    </div>
  );
}
