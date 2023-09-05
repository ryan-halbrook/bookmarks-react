import { useState } from 'react';
import { useEffect } from 'react';
import css from './BookmarkList.module.css';
import { searchBookmarks } from './client';

export default function BookmarkSearchList({search, collection, elementFunc}) {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await searchBookmarks(collection, search);
            const data = await response.json();
            data.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            setBookmarks(data);
            
        }

        fetchData();
    }, [search, collection]);

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
