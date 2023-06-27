import css from './AddTagForm.module.css';
import { useState } from 'react';
import BookmarkList from './BookmarkList';

export default function AddTagForm({bookmark}) {
    const [selectedBookmark, setSelectedBookmark] = useState(null);

    function onClickBookmark(bookmark) {
        setSelectedBookmark(bookmark)
    }

    function elementBookmark(bookmark) {
        return (
            <div onClick={onClickBookmark}>
                <p>{bookmark.name}</p>
            </div>
        )
    }

    return (
        <div className={css.module}>
            <BookmarkList elementFunc={elementBookmark}/>
        </div>
    )
}
