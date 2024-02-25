import { useState } from "react";
import { useEffect } from "react";
import BookmarkTagsList from "./BookmarkTagsList";
import css from "./BookmarkTags.module.css";
import { fetchTags, deleteTag } from "../client";
import * as logger from "../logger";

let logError = (message) => logger.error("BookmarkTags", message);

export default function BookmarkTags({ bookmark, onAddTag, onSelectBookmark }) {
  const [tags, setTags] = useState({});
  const [types, setTypes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  function processTags(data) {
    let typeTagsMap = {};
    let bookmarkTypes = [];
    for (const tag of data) {
      if (!(tag.bookmark.type.name in typeTagsMap)) {
        typeTagsMap[tag.bookmark.type.name] = [];
        bookmarkTypes.push(tag.bookmark.type);
      }
      typeTagsMap[tag.bookmark.type.name].push(tag);
    }
    setTags(typeTagsMap);
    setTypes(bookmarkTypes);
  }

  function onDeleteTag(tag) {
    let typeTagsMap = {};
    for (const type of types) {
      typeTagsMap[type.name] = tags[type.name].filter(
        (t) => t.tag_id !== tag.tag_id,
      );
    }
    setTags(typeTagsMap);

    deleteTag(bookmark.id, tag.tag_id);
  }

  useEffect(() => {
    fetchTags(bookmark.id)
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((json) => {
              processTags(json);
            })
            .catch((error) => {
              logError("Error loading tags: " + error);
            });
        } else {
          logError("Error loading tags: non-200 response.");
        }
      })
      .catch((error) => {
        logError("Error loading tags: " + error);
      });
  }, [bookmark]);

  return (
    <div className={css.tags}>
      <h2>Tags</h2>
      <button onClick={onAddTag}>Add Tag</button>
      <button
        onClick={() => setIsEditing(!isEditing)}
        style={{ margin: "0px 0px 0px 10px" }}
      >
        {isEditing ? "Done" : "Edit"}
      </button>
      <ul>
        {types.map((type) => {
          return (
            <li key={type.id}>
              <p className={css.typeName}>{type.name}</p>
              <BookmarkTagsList
                tags={tags[type.name]}
                onSelectBookmark={onSelectBookmark}
                onDeleteTag={onDeleteTag}
                isEditing={isEditing}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
