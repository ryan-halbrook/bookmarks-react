import BookmarkTags from './BookmarkTags';
import Modal from './Modal';
import AddTagForm from './AddTagForm';
import ConfirmDialog from './ConfirmDialog';
import css from './BookmarkDetail.module.css';
import { useState } from 'react';

export default function BookmarkDetail({bookmark}) {
    const [addTagShowing, setAddTagShowing] = useState(false);
    const [deleteShowing, setDeleteShowing] = useState(false);

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

    function showDeleteModal() {
        setDeleteShowing(true);
    }

    function onDismissDelete() {
        setDeleteShowing(false);
    }

    function addTagHandler() {
        setAddTagShowing(true);
        console.log('Add tag handler');
    }

    function onDismissAddTag() {
        setAddTagShowing(false);
    }

    return (
        <div className={css.detail}>
            { addTagShowing &&
                <Modal onDismiss={onDismissAddTag}>
                    <AddTagForm bookmark={bookmark}/>
                </Modal>
            }
            { deleteShowing &&
                <Modal onDismiss={onDismissDelete}>
                    <ConfirmDialog onConfirm={deleteBookmark} onCancel={onDismissDelete}>
                        Are you sure you want to delete the bookmark?
                    </ConfirmDialog>
                </Modal>
            }
            <h1>{bookmark.name}</h1>
            <p>:{bookmark.type.name}</p>
            <p>{bookmark.description}</p>
            <BookmarkTags bookmark={bookmark} onAddTag={addTagHandler}/>
            <button onClick={showDeleteModal}>Delete</button>
        </div>
    );
}
