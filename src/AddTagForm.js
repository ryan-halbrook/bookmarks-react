import css from './AddTagForm.module.css';
import { useState } from 'react';
import BookmarkList from './BookmarkList';

export default function AddTagForm({bookmark, onTagSaved}) {
    const [selectedBookmark, setSelectedBookmark] = useState(null);

    function onClickBookmark(event) {
        console.log(event);
        console.log(event.target.id);
        setSelectedBookmark(bookmark);
    }

    function elementBookmark(bookmark) {
        return (
            <div key={bookmark.id}>
                <p onClick={() => setSelectedBookmark(bookmark)}>{bookmark.name}</p>
            </div>
        )
    }

    function onSubmit(event) {
        event.preventDefault();
        console.log('Selected bookmark');
        console.log(selectedBookmark.name);
        onTagSaved(selectedBookmark);
    }

    return (
        <div className={css.container}>
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
                <button id="save">Save</button>
            </form>
        </div>
    )
}
