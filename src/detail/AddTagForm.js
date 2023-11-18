import css from './AddTagForm.module.css';
import { useState } from 'react';
import BookmarkList from '../list/BookmarkList';
import Bookmark from '../list/Bookmark';

export default function AddTagForm({collectionId, bookmarks, bookmark, onTagSaved, onDismiss}) {
    const [selectedBookmark, setSelectedBookmark] = useState(null);
    const [searchEntered, setSearchEntered] = useState(null);

    function bookmarkListItem(bookmark) {
        return (
            <div className={css.tagBookmark} key={bookmark.id}>
                <p onClick={() => setSelectedBookmark(bookmark)}>{bookmark.name}</p>
            </div>
        );
    }

    function onSubmit(event) {
        event.preventDefault();
        onTagSaved(selectedBookmark);
    }

    function onSearchEntered(event) {
        setSearchEntered(event.target.value);
    }

    return (
        <div className={css.container}>
            <h1 className={css.header}>Tag '{bookmark.name}'</h1>
            <input className={css.search} type="text" onChange={onSearchEntered}/>

            <div className={css.listContainer}>
                <BookmarkList
                    bookmarks={bookmarks}
                    listItemBuilder={bookmarkListItem}
                    collection={collectionId}
                    searchQuery={searchEntered}
                />
            </div>
            <div>
                {selectedBookmark && 
                    <div>
                        <Bookmark bookmark={selectedBookmark} detailButton={false}/>
                    </div>
                }
            </div>
            <form onSubmit={onSubmit}>
                <button type="button" onClick={onDismiss}>Cancel</button>
                <button id="save">Save</button>
            </form>
        </div>
    );
}
