import Bookmark from '../Bookmark';
import css from './BookmarkTagsList.module.css'

export default function BookmarkTagsList({bookmarks, onSelectBookmark}) {
    return (
        bookmarks.map((bookmark) => {
            return (
                <div className={css.bookmark}>
                    <button style={{margin: '5px'}} onClick={() => onSelectBookmark(bookmark.bookmark)}>
                        Detail
                    </button>
                    <a className={css.name} href={bookmark.bookmark.link} target="_blank">{bookmark.bookmark.name}</a>
                    {/* <p className="Bookmark-description">{bookmark.bookmark.description}</p> */}
                </div>
            )
        })
    )
}
