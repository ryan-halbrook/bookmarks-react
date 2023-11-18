import css from './AddBookmark.module.css';
import Modal from '../Modal';
import AddBookmarkForm from './AddBookmarkForm';
import { useState } from 'react';


export default function AddBookmark({onAddBookmark}) {
    const [addModalVisible, setAddModalVisible] = useState(false);

    return (
        <div className={css.addBookmark}>
            { addModalVisible &&
                <AddBookmarkForm
                    onDismiss={() => setAddModalVisible(false)}
                    onAdd={onAddBookmark}
                />
            }
            <button onClick={() => setAddModalVisible(true)}>
                + Bookmark
            </button>
        </div>
   );
}
