import { useState } from "react";
import { useEffect } from "react";
import BookmarkTagsList from "./BookmarkTagsList";
import css from "./BookmarkTags.module.css";
import { fetchTags, deleteTag } from "../client";

export default function BookmarkTags({ bookmark, onAddTag, onSelectBookmark }) {
  const [tags, setTags] = useState({});
  const [types, setTypes] = useState([]);

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
      typeTagsMap[type.name] = tags[type.name].filter((t) => t.id !== tag.id);
    }
    setTags(typeTagsMap);

    deleteTag(bookmark.id, tag.tag_id);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetchTags(bookmark.id);
      const data = await response.json();
      processTags(data);
    }

    fetchData();
  }, [bookmark]);

  return (
    <div className={css.tags}>
      <h2>Tags</h2>
      <button onClick={onAddTag}>Add Tag</button>
      <ul>
        {types.map((type) => {
          return (
            <li key={type.id}>
              <p className={css.typeName}>{type.name}</p>
              <BookmarkTagsList
                tags={tags[type.name]}
                onSelectBookmark={onSelectBookmark}
                onDeleteTag={onDeleteTag}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
