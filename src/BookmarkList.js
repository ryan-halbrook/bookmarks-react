import { useState } from 'react';
import { useEffect } from 'react';
import Bookmark from './Bookmark';
import css from './BookmarkList.module.css';

export default function BookmarkList({collection, topic, elementFunc}) {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        async function fetchBookmarks() {
            console.log(collection);
            if (Number.isInteger(collection)) {
                let url = 'http://127.0.0.1:5000/collections/' + collection + '/bookmarks';
                if (topic) {
                    console.log(topic);
                    url += '?type=' + topic;
                }
                const response = await fetch(url);
                const data = await response.json();
                data.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
                setBookmarks(data);
            } else {
                setBookmarks([]);
            }
        }

        fetchBookmarks();
    }, [collection, topic]);

    return (
        <div className={css.list}>
            <ul>{
                bookmarks.map((bookmark) => {
                    return elementFunc(bookmark);
                })
                }
            </ul>
        </div>
    );
}
