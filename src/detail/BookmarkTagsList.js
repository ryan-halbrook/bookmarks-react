import css from "./BookmarkTagsList.module.css";
import BookmarkTag from "./BookmarkTag";

export default function BookmarkTagsList({
  tags,
  onSelectBookmark,
  onDeleteTag,
  isEditing = false,
}) {
  return (
    <ul>
      {tags.map((tag) => {
        return (
          <li key={tag.id} className={css.bookmark}>
            <BookmarkTag
              tag={tag}
              onSelectBookmark={onSelectBookmark}
              onDeleteTag={onDeleteTag}
              isEditing={isEditing}
            />
          </li>
        );
      })}
    </ul>
  );
}
