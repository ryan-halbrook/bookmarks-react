import * as logger from "./logger.js";
import * as client from "./client.js";

let info = (message) => logger.info("BookmarksData", message);
let error = (message) => logger.error("BookmarksData", message);

export function sortBookmarks(bookmarksArray) {
  bookmarksArray.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}

export function nextSelectedCollection(collections) {
  if (collections.length > 0) {
    let collectionPref = Number(localStorage.getItem("collection"));
    if (
      collectionPref &&
      collections.find((item) => item.id === collectionPref)
    ) {
      return collectionPref;
    } else {
      return collections[0].id;
    }
  }
  return null;
}

export function loadCollections() {
  return new Promise((resolve, reject) => {
    client
      .fetchCollections()
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject("Failed to resolve json");
            });
        } else {
          reject("Failed to read collections");
        }
      })
      .catch((error) => {
        reject("Failed to load collections: " + error);
      });
  });
}

// Returns a promise that resolves to an array of bookmarks.
// The array is sorted alphabetically by bookmark name.
export function loadBookmarks(collectionId, typeId) {
  console.assert(Number.isInteger(collectionId));
  return new Promise((resolve, reject) => {
    info(
      "fetching bookmarks, collectionId=" + collectionId + ", typeId=" + typeId,
    );
    client
      .fetchBookmarks(collectionId, typeId)
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((data) => {
              sortBookmarks(data);
              resolve(data);
            })
            .catch((error) => {
              reject("Failed to process bookmarks: " + error);
            });
        } else {
          reject("Non-200 response when loading bookmarks");
        }
      })
      .catch((error) => {
        reject("Failed to load bookmarks: " + error);
      });
  });
}
