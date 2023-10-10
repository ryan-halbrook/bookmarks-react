import './App.css';

import { useState, useEffect } from 'react';
import BookmarkList from './BookmarkList';
import BookmarkSearchList from './BookmarkSearchList';
import SiteHeader from './header/SiteHeader';
import AddBookmarkForm from './AddBookmarkForm';
import AddCollectionForm from './AddCollectionForm';
import Modal from './Modal';
import BookmarkDetail from './detail/BookmarkDetail';
import Bookmark from './Bookmark';
import { fetchCollections, addBookmark, addCollection } from './client';


export default function App() {
    const [addBookmarkVisible, setAddBookmarkVisible] = useState(false);
    const [addCollectionVisible, setAddCollectionVisible] = useState(false);
    const [selectedBookmark, setSelectedBookmark] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [search, setSearch] = useState(null);

    useEffect(() => {
        setSelectedType(null);
    }, [search])

    if (!localStorage.getItem('token') || !localStorage.getItem('email')) {
        window.location.replace('/login');
    }

    async function fetchData() {
        const response = await fetchCollections();
        const data = await response.json();
        if (data.length > 0) {
            if (selectedCollection == null) {
                setSelectedCollection(data[0].id);
            }
        }
    }

    if (selectedCollection == null) {
        fetchData();
    }

    function showAddBookmark() {
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
        setSelectedBookmark(bookmark);
    }

    function onAddBookmark(data) {
        addBookmark(selectedCollection, data);
    }

    function onAddCollection(data) {
        addCollection(data);
    }

    function setSearchDebug(data) {
        setSearch(data);
    }

    function elementBookmark(bookmark) {
        if (selectedType == null) {
            return <Bookmark key={bookmark.id} bookmark={bookmark} onSelect={selectBookmark} setTopic={setSelectedType} selected={selectedBookmark && selectedBookmark.id === bookmark.id}/>
        } else {
            return <Bookmark key={bookmark.id} bookmark={bookmark} onSelect={selectBookmark} setTopic={setSelectedType} showInfo='description' selected={selectedBookmark && selectedBookmark.id === bookmark.id}/>
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
            <SiteHeader
                onShowAddBookmark={showAddBookmark}
                onShowAddCollection={showAddCollection}
                collection={selectedCollection}
                setCollection={setSelectedCollection}
                setTopic={setSelectedType}
                setSearch={setSearchDebug}
            />

            <div className="Content">
                <div className="Bookmark-list-panel">
                    { search &&
                        <>
                        <div className="Bookmark-list-info">
                            Name Contains '{search}'
                        </div>
                        <BookmarkSearchList collection={selectedCollection} search={search} elementFunc={elementBookmark}/>
                        </>
                    }
                    { (selectedCollection && !search) &&
                        <BookmarkList collection={selectedCollection} topic={selectedType} elementFunc={elementBookmark}/>
                    }
                </div>
                <div className="Bookmark-detail-panel">
                    { selectedBookmark &&
                        <BookmarkDetail collectionId={selectedCollection} bookmark={selectedBookmark} onSelectBookmark={selectBookmark}/>
                    }
                </div>
            </div>
        </div>
    );
}
