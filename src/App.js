import './App.css';

import { useState } from 'react';
import BookmarkList from './BookmarkList';
import SiteHeader from './SiteHeader';
import AddBookmarkForm from './AddBookmarkForm';
import AddCollectionForm from './AddCollectionForm';
import Modal from './Modal';
import BookmarkDetail from './BookmarkDetail';
import Bookmark from './Bookmark';
import { fetchCollections, addBookmark, addCollection } from './client';


export default function App() {
    const [addBookmarkVisible, setAddBookmarkVisible] = useState(false);
    const [addCollectionVisible, setAddCollectionVisible] = useState(false);
    const [selectedBookmark, setSelectedBookmark] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedCollection, setSelectedCollection] = useState(null);

    if (!localStorage.getItem('token') || !localStorage.getItem('email')) {
        window.location.replace('/login');
    }
    
    async function fetchData() {
        const response = await fetchCollections();
        const data = await response.json();
        console.log(data)
        if (data.length > 0){
            console.log(data.length)
            if (selectedCollection == null) {
                setSelectedCollection(data[0].id);
            }
        }
    }

    if (selectedCollection == null) {
        fetchData();
    }

    function showAddBookmark() {
        console.log('showAddBookmark')
        setAddBookmarkVisible(true);
    }

    function showAddCollection() {
        setAddCollectionVisible(true);
    }

    function dismissAddBookmark() {
        setAddBookmarkVisible(false);
    }

    function dismissAddCollection() {
        setAddCollectionVisible(false);
    }

    function selectBookmark(bookmark) {
        console.log(bookmark);
        setSelectedBookmark(bookmark);
    }

    function onAddBookmark(data) {
        addBookmark(selectedCollection, data);
    }

    function onAddCollection(data) {
        addCollection(data);
    }

    function elementBookmark(bookmark) {
        if (selectedType == null) {
            return <Bookmark key={bookmark.id} bookmark={bookmark} onSelect={selectBookmark} setTopic={setSelectedType}/>
        } else {
            return <Bookmark key={bookmark.id} bookmark={bookmark} onSelect={selectBookmark} setTopic={setSelectedType} showInfo='description'/>
        }
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
            { addCollectionVisible &&
                <Modal onDismiss={dismissAddCollection}>
                    <AddCollectionForm 
                        onAddCollection={onAddCollection} 
                        onDismiss={dismissAddCollection}
                    />
                </Modal>
            }
            <SiteHeader onShowAddBookmark={showAddBookmark} onShowAddCollection={showAddCollection} collection={selectedCollection} setCollection={setSelectedCollection} setTopic={setSelectedType}/>
            <div className="Content">
                <div className="Bookmark-list-panel">
                  { selectedCollection &&
                    <BookmarkList collection={selectedCollection} topic={selectedType} elementFunc={elementBookmark}/>
                  }
                </div>
                <div className="Bookmark-detail-panel">
                    { selectedBookmark &&
                        <BookmarkDetail bookmark={selectedBookmark} onSelectBookmark={selectBookmark}/>
                    }
                </div>
            </div>
        </div>
    );
}
