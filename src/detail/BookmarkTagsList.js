import css from './BookmarkTagsList.module.css'
import { deleteTag } from '../client.js'

export default function BookmarkTagsList({bookmarks, onSelectBookmark, isEditing=true}) {

    function deleteBookmarkTag(bookmark) {
        deleteTag(bookmark.bookmark.id, bookmark.tag_id);
    }

    return (
        bookmarks.map((bookmark) => {
            return (
                <div className={css.bookmark}>
                    <button style={{margin: '5px'}} onClick={() => onSelectBookmark(bookmark.bookmark)}>
                        Detail
                    </button>
                    <a className={css.name} href={bookmark.bookmark.link} target="_blank" rel="noreferrer">{bookmark.bookmark.name}</a>
                    { isEditing &&
                        <button onClick={() => deleteBookmarkTag(bookmark)}>Delete</button>
                    }
                </div>
            )
        })
    )
}
