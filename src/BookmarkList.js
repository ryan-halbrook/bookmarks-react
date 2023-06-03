import { useState } from 'react';
import { useEffect } from 'react';
import Bookmark from './Bookmark';

export default function BookmarkList({onSelect}) {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        async function fetchBookmarks() {
            const response = await fetch('http://127.0.0.1:5000/bookmarks');
            const data = await response.json();
            setBookmarks(data);
        }

        fetchBookmarks()
    }, []);

    return (
        <div className="Bookmark-list">
            <ul>{
                bookmarks.map((bookmark) => {
                    return <Bookmark key={bookmark.id} bookmark={bookmark} onSelect={onSelect}/>
                })
                }
            </ul>
        </div>
    );
}
