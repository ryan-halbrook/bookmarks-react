import css from './AddTagForm.module.css';
import { useState } from 'react';
import BookmarkList from '../BookmarkList';
    
export default function AddTagForm({bookmark, onTagSaved}) {
    const [selectedBookmark, setSelectedBookmark] = useState(null);

    function elementBookmark(bookmark) {
        return (
            <div class={css.tagBookmark} key={bookmark.id}>
                <input type="checkbox" />
                <p onClick={() => setSelectedBookmark(bookmark)}>{bookmark.name}</p>
            </div>
        )
    }

    function onSubmit(event) {
        event.preventDefault();
        onTagSaved(selectedBookmark);
    }

    return (
        <div className={css.container}>
            <h1>Edit Tags for '{bookmark.name}'</h1>
            <input className={css.search} type="text" />
            <div className={css.listContainer}>
                <BookmarkList collection={1} topic={null} elementFunc={elementBookmark}/>
            </div>
            <form onSubmit={onSubmit}>
                <p>
                    Selected
                </p>
                { selectedBookmark &&
                    <p className={css.bookmarkName}>
                        {selectedBookmark.name}
                    </p>
                }
                <button type="button">Cancel</button>
                <button id="save">Save</button>
            </form>
        </div>
    )
}
