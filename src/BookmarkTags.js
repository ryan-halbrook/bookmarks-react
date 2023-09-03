import { useState } from 'react';
import { useEffect } from 'react';
import BookmarkTagsList from './BookmarkTagsList';
import css from './BookmarkTags.module.css';
import { fetchTags } from './client'

export default function BookmarkTags({bookmark, onAddTag, onSelectBookmark}) {
   const [tags, setTags] = useState({});
   const [types, setTypes] = useState([]);
  
   function processTags(data) {
       let typeTagsMap = {};
       let bookmarkTypes = [];
       for (const tag of data) {
           if (!(tag.bookmark.type.name in typeTagsMap)) {
               typeTagsMap[tag.bookmark.type.name] = [];
               bookmarkTypes.push(tag.bookmark.type.name);
           }
           typeTagsMap[tag.bookmark.type.name].push(tag);
       }
       setTags(typeTagsMap);
       setTypes(bookmarkTypes);
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
            <div>
                <ul>{
                    types.map((type) => {
                        return <>
                                  <p className={css.typeName}>{type}</p>
                                  <BookmarkTagsList bookmarks={tags[type]} onSelectBookmark={onSelectBookmark}/>
                               </>
                    })
                    }
                </ul>
            </div>
        </div>
    );
}
