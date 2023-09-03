import { useState } from 'react';
import { useEffect } from 'react';
import css from './BookmarkList.module.css';
import { fetchBookmarks } from './client';

export default function BookmarkList({collection, topic, elementFunc}) {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (Number.isInteger(collection)) {
                const response = await fetchBookmarks(collection, topic);
                const data = await response.json();
                data.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
                setBookmarks(data);
            } else {
                setBookmarks([]);
            }
        }

        fetchData();
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
