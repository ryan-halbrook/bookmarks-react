import css from './BookmarkList.module.css';

export default function BookmarkList({bookmarks, elementFunc}) {
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
