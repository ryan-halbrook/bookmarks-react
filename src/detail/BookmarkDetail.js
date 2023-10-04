import BookmarkTags from './BookmarkTags';
import Modal from '../Modal';
import AddTagForm from './AddTagForm';
import ConfirmDialog from '../ConfirmDialog';
import css from './BookmarkDetail.module.css';
import { useState } from 'react';
import { deleteBookmark, addTag } from '../client'

export default function BookmarkDetail({collectionId, bookmark, onSelectBookmark}) {
    const [addTagShowing, setAddTagShowing] = useState(false);
    const [deleteShowing, setDeleteShowing] = useState(false);

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
        addTag(bookmark.id, tag.id);
    }

    return (
        <div className={css.detail}>
            { addTagShowing &&
                <Modal onDismiss={onDismissAddTag}>
                    <AddTagForm collectionId={collectionId} bookmark={bookmark} onTagSaved={onTagSaved} onDismiss={onDismissAddTag}/>
                </Modal>
            }
            { deleteShowing &&
                <Modal onDismiss={onDismissDelete}>
                    <ConfirmDialog onConfirm={() => {deleteBookmark(collectionId, bookmark.id);}} onCancel={onDismissDelete}>
                        Are you sure you want to delete the bookmark?
                    </ConfirmDialog>
                </Modal>
            }
            <h1><a className={css.link} href={bookmark.link} target="_blank" rel="noreferrer">{bookmark.name}</a></h1>
            <p className={css.typeLabel}>:{bookmark.type.name}</p>
            <p>{bookmark.description}</p>
            <BookmarkTags bookmark={bookmark} onAddTag={addTagHandler} onSelectBookmark={onSelectBookmark}/>
            <button className={css.deleteButton} onClick={showDeleteModal}>Delete</button>
        </div>
    );
}