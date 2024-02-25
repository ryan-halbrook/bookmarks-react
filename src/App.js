import css from "./App.module.css";
import { useState, useEffect } from "react";
import BookmarkList from "./list/BookmarkList";
import Bookmark from "./list/Bookmark";
import SiteHeader from "./header/SiteHeader";
import BookmarkDetail from "./detail/BookmarkDetail";
import * as client from "./client";
import Modal from "./Modal";
import * as logger from "./logger";
import {
  sortBookmarks,
  nextSelectedCollection,
  loadCollections,
  loadBookmarks,
} from "./BookmarksData";

let logInfo = (message) => logger.info("App", message);
let logError = (message) => logger.error("App", message);

function getLoggedInUser() {
  return localStorage.getItem("token");
}

export default function App() {
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [search, setSearch] = useState(null);

  const [collections, setCollections] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  const [errorText, setErrorText] = useState(null);

  function setCollection(id) {
    console.assert(Number.isInteger(id));
    // If the id exists in the collection, update component state and
    // localStorage.
    if (collections.find((item) => item.id === id)) {
      setSelectedType(null);
      setSelectedBookmark(null);
      logInfo("Setting localStorage 'collection' to " + id);
      localStorage.setItem("collection", id);
      setSelectedCollection(Number(id));
    }
  }

  // Load bookmarks when selectedCollection or
  // selectedType changes.
  useEffect(() => {
    let collectionId = selectedCollection;
    let typeId = selectedType;
    if (collectionId) {
      logInfo(
        "Loading bookmarks, collectionId=" +
          collectionId +
          ", typeId=" +
          typeId,
      );
      loadBookmarks(collectionId, typeId)
        .then((bookmarks) => {
          if (selectedCollection === collectionId && selectedType === typeId) {
            logInfo(
              "Setting bookmarks, collectionId=" +
                collectionId +
                ", typeId=" +
                typeId,
            );
            setBookmarks(bookmarks);
          }
        })
        .catch((error) => {
          logError("loadBookmarks failed: " + error);
          setErrorText("Failed to load bookmarks.\n" + error);
        });
    }
  }, [selectedCollection, selectedType]);

  useEffect(() => {
    logInfo("Fetching collections");
    loadCollections()
      .then((collectionsArray) => {
        setCollections(collectionsArray);
      })
      .catch((error) => {
        logError("loadCollections failed: " + error);
        setErrorText("Failed to load collections.\n" + error);
      });
  }, []);

  useEffect(() => {
    logInfo("Collections changed, updating selectedCollection");
    setCollection(nextSelectedCollection(collections));
  }, [collections]);

  useEffect(() => {
    setSelectedType(null);
  }, [search]);

  // Redirect to login page if not logged in.
  if (!getLoggedInUser()) {
    window.location.replace("/login");
  }

  function selectBookmark(bookmark) {
    setSelectedBookmark(bookmark);
  }

  function onAddCollection(data) {
    setCollections([...collections, { id: 0, name: data.name }]);
    client.addCollection(data);
  }

  let bookmarkFromData = (bookmark) => {
    return {
      id: bookmark.id,
      name: bookmark.name,
      link: bookmark.link,
      type: {
        id: bookmark.type.id,
        name: bookmark.type.name,
        collectionId: bookmark.type.collectionId,
      },
      description: bookmark.description,
    };
  };

  function onAddBookmark(bookmark) {
    client
      .addBookmark(selectedCollection, bookmark)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            let bookmarksArray = [...bookmarks, bookmarkFromData(data)];
            sortBookmarks(bookmarksArray);
            setBookmarks(bookmarksArray);
          });
        } else {
          setErrorText("Failed to add bookmark");
          logError("Failed to add bookmark");
        }
      })
      .catch((error) => {
        setErrorText("Server Error: Failed to add bookmark: " + error);
        logError("Server Error: Failed to add bookmark: " + error);
      });
  }

  function onDeleteBookmark(collectionId, bookmarkId) {
    client
      .deleteBookmark(collectionId, bookmarkId)
      .then((response) => {
        if (response.status === 200) {
          let bookmarksArray = bookmarks.filter((item) => {
            return item.id !== bookmarkId;
          });
          //sortBookmarks(bookmarksArray);
          setBookmarks(bookmarksArray);
        } else {
          setErrorText("Failed to parse deleted bookmark");
        }
      })
      .catch((error) => {
        setErrorText("Server Error: Failed to delete bookmark");
      });
  }

  function refreshBookmark(collectionId, bookmarkId) {
    client.fetchBookmark(collectionId, bookmarkId).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          let bookmarksArray = bookmarks.map((item) => {
            if (item.id === bookmarkId) {
              let bookmark = bookmarkFromData(data);
              if (selectedBookmark && selectedBookmark.id === bookmarkId) {
                setSelectedBookmark(bookmark);
              }
              return bookmark;
            } else {
              return item;
            }
          });
          sortBookmarks(bookmarksArray);
          setBookmarks(bookmarksArray);
        });
      }
    });
  }

  function onUpdateBookmark(collectionId, bookmarkId, updatedBookmark) {
    client
      .updateBookmark(collectionId, bookmarkId, updatedBookmark)
      .then((response) => {
        if (response.status === 200) {
          refreshBookmark(collectionId, bookmarkId);
        } else {
          setErrorText("Failed to update bookmark");
        }
      })
      .catch((error) => {
        setErrorText("Server Error: Failed to update bookmark");
      });
  }

  function onAddCollection(collection) {
    client
      .addCollection(collection)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            let collectionsArray = [
              ...collections,
              { id: data.id, name: data.name },
            ];
            setCollections(collectionsArray);
          });
        } else {
          setErrorText("Failed to parse new collection");
        }
      })
      .catch((error) => {
        setErrorText("Server Error: Failed to add collection");
      });
  }

  function bookmarkListItem(bookmark) {
    return (
      <Bookmark
        key={bookmark.id}
        bookmark={bookmark}
        onSelect={selectBookmark}
        setTopic={setSelectedType}
        showInfo={selectedType == null ? "type" : "description"}
        selected={selectedBookmark && selectedBookmark.id === bookmark.id}
      />
    );
  }

  return (
    <div className={css.container}>
      {errorText && (
        <Modal onDismiss={() => setErrorText(null)}>
          <form onSubmit={() => setErrorText(null)}>
            <h1>{errorText}</h1>
            <button>Ok</button>
          </form>
        </Modal>
      )}

      <SiteHeader
        onAddBookmark={onAddBookmark}
        onAddCollection={onAddCollection}
        collections={collections}
        collection={selectedCollection}
        setCollection={setCollection}
        setType={setSelectedType}
        setSearch={setSearch}
      />

      <div className={css.content}>
        <div className={css.listPanel}>
          <BookmarkList
            bookmarks={bookmarks}
            listItemBuilder={bookmarkListItem}
            collection={selectedCollection}
            searchQuery={search}
          />
        </div>
        <div className={css.detailPanel}>
          {selectedBookmark && (
            <BookmarkDetail
              collectionId={selectedCollection}
              bookmarks={bookmarks}
              bookmark={selectedBookmark}
              onSelectBookmark={selectBookmark}
              onUpdateBookmark={onUpdateBookmark}
              onDeleteBookmark={onDeleteBookmark}
            />
          )}
        </div>
      </div>
    </div>
  );
}
