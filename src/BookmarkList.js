import { useState } from 'react';
import { useEffect } from 'react';
import Bookmark from './Bookmark';
import css from './BookmarkList.module.css';

export default function BookmarkList({onSelect, selectedTopic, setTopic}) {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        async function fetchBookmarks() {
            let url = 'http://127.0.0.1:5000/bookmarks';
            if (selectedTopic) {
                url += '?type=' + selectedTopic;
            }
            const response = await fetch(url);
            const data = await response.json();
            data.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            setBookmarks(data);
        }

        fetchBookmarks();
    }, [selectedTopic]);

    return (
        <div className={css.list}>
            <ul>{
                bookmarks.map((bookmark) => {
                    return <Bookmark key={bookmark.id} bookmark={bookmark} onSelect={onSelect} setTopic={setTopic}/>
                })
                }
            </ul>
        </div>
    );
}
