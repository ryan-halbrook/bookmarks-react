import { useState } from 'react';
import { useEffect } from 'react';
import Bookmark from './Bookmark';

export default function BookmarkTags({bookmark}) {
   const [tags, setTags] = useState([]);
   
   useEffect(() => {
        async function fetchTags() {
            const response = await fetch('http://127.0.0.1:5000/bookmarks/' + bookmark.id + '/tags');
            const data = await response.json();
            setTags(data);
        }

        fetchTags();
    }, [bookmark]);

    console.log(bookmark);
    console.log(tags);

    return (
        <div className="bookmarkTags">
            <div className="Bookmark-list">
                <ul>{
                    tags.map((tag) => {
                        return <Bookmark key={tag.id} bookmark={tag}/>
                    })
                    }
                </ul>
            </div>
        </div>
    );
}