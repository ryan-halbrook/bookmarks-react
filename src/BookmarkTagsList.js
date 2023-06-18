import Bookmark from './Bookmark';
import css from './BookmarkTagsList.module.css'

export default function BookmarkTagsList({bookmarks}) {
    return (
        bookmarks.map((bookmark) => {
            return (
                <div className={css.bookmark}>
                    <a className={css.name} href={bookmark.link} target="_blank">{bookmark.bookmark.name}</a>
                    {/* <p className="Bookmark-description">{bookmark.bookmark.description}</p> */}
                </div>
            )
        })
    )
}
