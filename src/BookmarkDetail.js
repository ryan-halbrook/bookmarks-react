import BookmarkTags from './BookmarkTags';
import css from './BookmarkDetail.module.css';

export default function BookmarkDetail({bookmark}) {

    function deleteBookmark() {
        fetch('http://127.0.0.1:5000/bookmarks/' + bookmark.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': 'content-type',
                'Access-Control-Request-Method': 'POST',
               // 'Accept': 'application/json'
            }
        });
    }

    return (
        <div className={css.detail}>
            <h1>{bookmark.name}</h1>
            <h2>{bookmark.description}</h2>
            <BookmarkTags bookmark={bookmark}/>
            <button onClick={deleteBookmark}>Delete</button>
        </div>
    );
}
