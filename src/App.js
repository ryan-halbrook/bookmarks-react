import './App.css';

import { useState } from 'react';
import { useEffect } from 'react';
import BookmarkList from './BookmarkList';
import BookmarkTags from './BookmarkTags';
import SiteHeader from './SiteHeader';
import AddBookmarkForm from './AddBookmarkForm';
import Modal from './Modal';


export default function App() {
    const [addBookmarkVisible, setAddBookmarkVisible] = useState(false);

    function showAddBookmark() {
        console.log('showAddBookmark')
        setAddBookmarkVisible(true);
    }

    function dismissAddBookmark() {
        setAddBookmarkVisible(false);
    }

    const bookmark = {
        id: 1,
        name: 'Example',
        link: 'http://example.com',
        topic: {
            id: 1,
            name: 'Topic'
        },
        description: 'Description'
    }
    return (
        <div className="Site-container">
            { addBookmarkVisible &&
                <Modal content={<AddBookmarkForm/>} onDismiss={dismissAddBookmark} />
            }
            <SiteHeader onShowAddBookmark={showAddBookmark}/>
            <div className="Content">
                <div className="Bookmark-list-panel">
                        <BookmarkList/>
                </div>
                <div className="Bookmark-detail-panel">
                    <BookmarkTags bookmark={bookmark}/>
                </div>
            </div>
        </div>
    );
}
