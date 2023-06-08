import './App.css';

import { useState } from 'react';
import BookmarkList from './BookmarkList';
import SiteHeader from './SiteHeader';
import AddBookmarkForm from './AddBookmarkForm';
import Modal from './Modal';
import BookmarkDetail from './BookmarkDetail';


export default function App() {
    const [addBookmarkVisible, setAddBookmarkVisible] = useState(false);
    const [selectedBookmark, setSelectedBookmark] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);

    function showAddBookmark() {
        console.log('showAddBookmark')
        setAddBookmarkVisible(true);
    }

    function dismissAddBookmark() {
        setAddBookmarkVisible(false);
    }

    function selectBookmark(bookmark) {
        console.log(bookmark);
        setSelectedBookmark(bookmark);
    }

    function onAddBookmark(data) {
        console.log(data)
        fetch('http://127.0.0.1:5000/bookmarks', {
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
        <div className="Site-container">
            { addBookmarkVisible &&
                <Modal onDismiss={dismissAddBookmark}>
                    <AddBookmarkForm 
                        onAddBookmark={onAddBookmark} 
                        onDismiss={dismissAddBookmark}
                    />
                </Modal>
            }
            <SiteHeader onShowAddBookmark={showAddBookmark} setTopic={setSelectedTopic}/>
            <div className="Content">
                <div className="Bookmark-list-panel">
                    <BookmarkList
                        onSelect={selectBookmark}
                        selectedTopic={selectedTopic}
                        setTopic={setSelectedTopic}
                    />
                </div>
                <div className="Bookmark-detail-panel">
                    { selectedBookmark &&
                        <BookmarkDetail bookmark={selectedBookmark}/>
                    }
                </div>
            </div>
        </div>
    );
}
