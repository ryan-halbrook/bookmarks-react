import css from './AddTagForm.module.css';
import { useState } from 'react';
import BookmarkList from '../BookmarkList';
import BookmarkSearchList from '../BookmarkSearchList';
import Bookmark from '../Bookmark';

export default function AddTagForm({collectionId, bookmark, onTagSaved, onDismiss}) {
    const [selectedBookmark, setSelectedBookmark] = useState(null);
    const [searchEntered, setSearchEntered] = useState(null);

    function elementBookmark(bookmark) {
        return (
            <div class={css.tagBookmark} key={bookmark.id}>
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
                {searchEntered ? (
                    <BookmarkSearchList search={searchEntered} collection={collectionId} elementFunc={elementBookmark}/>
                ) : (
                    <BookmarkList collection={collectionId} topic={null} elementFunc={elementBookmark}/>
                )}
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
