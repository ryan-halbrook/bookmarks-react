import css from './AddTagForm.module.css';
import { useState } from 'react';
import BookmarkList from './BookmarkList';

export default function AddTagForm({bookmark}) {
    const [selectedBookmark, setSelectedBookmark] = useState(null);

    function onClickBookmark(event) {
        console.log(event);
        // setSelectedBookmark(bookmark);
    }

    function elementBookmark(bookmark) {
        return (
            <div onClick={onClickBookmark}>
                <p>{bookmark.name}</p>
            </div>
        )
    }

    function onSubmit(event) {
        console.log('Selected bookmark');
        console.log(selectedBookmark.name);
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
                        console.log(selectedBookmark);
                        {selectedBookmark.name}
                    </p>
                }
                <button id="save">Save</button>
            </form>
        </div>
    )
}
