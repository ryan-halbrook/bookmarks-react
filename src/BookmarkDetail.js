import BookmarkTags from './BookmarkTags';
import Modal from './Modal';
import AddTagForm from './AddTagForm';
import ConfirmDialog from './ConfirmDialog';
import css from './BookmarkDetail.module.css';
import { useState } from 'react';

export default function BookmarkDetail({bookmark, onSelectBookmark}) {
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

    function onTagSaved(tag) {
        setAddTagShowing(false);
        console.log('1234');
        console.log(tag);

        const data = {
            'tag_bookmark_id': tag.id
        };

        fetch('http://127.0.0.1:5000/bookmarks/' + bookmark.id  + '/tags', {
            method: 'POST',
            body: JSON.stringify(data),
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
            { addTagShowing &&
                <Modal onDismiss={onDismissAddTag}>
                    <AddTagForm bookmark={bookmark} onTagSaved={onTagSaved}/>
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
            <BookmarkTags bookmark={bookmark} onAddTag={addTagHandler} onSelectBookmark={onSelectBookmark}/>
            <button onClick={showDeleteModal}>Delete</button>
        </div>
    );
}
