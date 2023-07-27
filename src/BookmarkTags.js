import { useState } from 'react';
import { useEffect } from 'react';
import BookmarkTagsList from './BookmarkTagsList';
import css from './BookmarkTags.module.css';

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
        async function fetchTags() {
            const response = await fetch('http://127.0.0.1:5000/bookmarks/' + bookmark.id + '/tags');
            const data = await response.json();
            processTags(data);
        }

        fetchTags();
    }, [bookmark]);

    return (
        <div className={css.tags}>
            <h1>Tags</h1>
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
