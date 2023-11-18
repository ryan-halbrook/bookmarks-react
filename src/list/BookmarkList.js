import css from './BookmarkList.module.css';
import { useState, useEffect } from 'react';
import { searchBookmarks } from '../client';
import Bookmark from './Bookmark';


export default function BookmarkList({
    bookmarks,
    listItemBuilder,
    collection,
    searchQuery})
{

    const [matchBookmarks, setMatchBookmarks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await searchBookmarks(collection, searchQuery);
            const data = await response.json();
            data.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            setMatchBookmarks(data);

        }

        if (collection && searchQuery) {
            fetchData();
        }
    }, [searchQuery, collection]);


    let finalBookmarks = searchQuery ? matchBookmarks : bookmarks;
    return (
        <>
            { (collection && searchQuery) &&
                <div className={css.info}>
                    Name Contains '{searchQuery}'
                </div>
            }
            <div className={css.list}>
                <ul>{
                    finalBookmarks.map((bookmark) => {
                        return listItemBuilder(bookmark);
                    })
                }
                </ul>
            </div>
        </>
    );
}
