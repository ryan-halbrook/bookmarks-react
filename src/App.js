import './App.css';

import { useState, useEffect } from 'react';
import BookmarkList from './BookmarkList';
import BookmarkSearchList from './BookmarkSearchList';
import SiteHeader from './header/SiteHeader';
import BookmarkDetail from './detail/BookmarkDetail';
import Bookmark from './Bookmark';
import { fetchCollections,
         fetchBookmarks,
         addBookmark,
         addCollection
       } from './client';


function getLoggedInUser() {
    return localStorage.getItem('token');
}

export default function App() {
    const [selectedBookmark, setSelectedBookmark] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [search, setSearch] = useState(null);

    const [collections, setCollections] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (Number.isInteger(selectedCollection)) {
                const response = await fetchBookmarks(selectedCollection,
                                                      selectedType);
                const data = await response.json();
                data.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
                setBookmarks(data);
            } else {
                setBookmarks([]);
            }
        }

        fetchData();
    }, [selectedCollection, selectedType]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetchCollections();
            const data = await response.json();
            setCollections(data);
            if (data.length > 0) {
                setSelectedCollection(data[0].id);
            }
        }
        fetchData();
    }, []);


    useEffect(() => {
        setSelectedType(null);
    }, [search])

    if (!getLoggedInUser()) {
        window.location.replace('/login');
    }

    function selectBookmark(bookmark) {
        setSelectedBookmark(bookmark);
    }

    function onAddBookmark(data) {
        let new_array = [ ...bookmarks, 
            { 'name': data.name,
              'link': data.link,
              'type': {
                  'id': 0,
                  'name': data.type,
              },
              'description': data.description,
            }
        ]

        new_array.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
        setBookmarks(new_array);
        addBookmark(selectedCollection, data);
    }

    function onAddCollection(data) {
        setCollections([ ...collections, { 'id': 0, 'name': data.name } ]);
        addCollection(data);
    }

    function elementBookmark(bookmark) {
        return (
            <Bookmark
                key={bookmark.id}
                bookmark={bookmark}
                onSelect={selectBookmark}
                setTopic={setSelectedType}
                showInfo={(selectedType == null) ? 'type' : 'description'}
                selected={selectedBookmark && selectedBookmark.id === bookmark.id}
           />
        );
    }

    return (
        <div className="Site-container">

            <SiteHeader
                onAddBookmark={onAddBookmark}
                onAddCollection={onAddCollection}
                collections={collections}
                collection={selectedCollection}
                setCollection={setSelectedCollection}
                setType={setSelectedType}
                setSearch={setSearch}
            />

            <div className="Content">
                <div className="Bookmark-list-panel">
                    { search &&
                        <>
                        <div className="Bookmark-list-info">
                            Name Contains '{search}'
                        </div>
                        <BookmarkSearchList
                            collection={selectedCollection}
                            search={search}
                            elementFunc={elementBookmark}/>
                        </>
                    }
                    { (selectedCollection && !search) &&
                        <BookmarkList
                            bookmarks={bookmarks}
                            elementFunc={elementBookmark}
                        />
                    }
                </div>
                <div className="Bookmark-detail-panel">
                    { selectedBookmark &&
                        <BookmarkDetail
                            collectionId={selectedCollection}
                            bookmarks={bookmarks}
                            bookmark={selectedBookmark}
                            onSelectBookmark={selectBookmark}
                        />
                    }
                </div>
            </div>
        </div>
    );
}
