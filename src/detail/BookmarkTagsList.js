import css from './BookmarkTagsList.module.css'

export default function BookmarkTagsList({tags, onSelectBookmark, onDeleteTag, isEditing=true}) {
    return (
        <ul>
        {
        tags.map((tag) => {
            return (
                <li key={tag.id} className={css.bookmark}>
                    <button style={{margin: '5px'}} onClick={() => onSelectBookmark(tag.bookmark)}>
                        Detail
                    </button>
                    <a className={css.name} href={tag.bookmark.link} target="_blank" rel="noreferrer">{tag.bookmark.name}</a>
                    { isEditing &&
                        <button onClick={() => onDeleteTag(tag)}>Delete</button>
                    }
                </li>
            )
        })
        }
        </ul>
    )
}
