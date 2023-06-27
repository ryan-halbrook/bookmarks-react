import BookmarkTags from './BookmarkTags';
import Modal from './Modal';
import AddTagForm from './AddTagForm';
import css from './BookmarkDetail.module.css';
import { useState } from 'react';

export default function BookmarkDetail({bookmark}) {
    const [addTagShowing, setAddTagShowing] = useState(false);

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

    function addTagHandler() {
        setAddTagShowing(true);
        console.log('Add tag handler');
    }

    return (
        <div className={css.detail}>
            { addTagShowing &&
                <Modal>
                    <AddTagForm bookmark={bookmark}/>
                </Modal>
            }
            <h1>{bookmark.name}</h1>
            <p>:{bookmark.type.name}</p>
            <p>{bookmark.description}</p>
            <BookmarkTags bookmark={bookmark} onAddTag={addTagHandler}/>
            <button onClick={deleteBookmark}>Delete</button>
        </div>
    );
}
