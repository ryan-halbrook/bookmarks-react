import * as logger from "./logger.js";

let logInfo = (message) => logger.info("client", message);
let logVerbose = (message) => logger.verbose("client", message);

function url(resource) {
  const protocol = "http";
  const defaultPort = 3000;

  const getEnv = (key, defaultValue) => {
    if (Object.hasOwn(process.env, key)) {
      return process.env[key];
    } else {
      return defaultValue;
    }
  };

  const host = getEnv("REACT_APP_BOOKMARKS_HOST", window.location.hostname);
  const port = getEnv("REACT_APP_BOOKMARKS_PORT", defaultPort);
  return `${protocol}://${host}:${port}${resource}`;
}

class Headers {
  static authorization = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  static contentTypeJson = {
    "Content-Type": "application/json",
  };

  static accessControl = (method) => {
    return {
      "Access-Control-Request-Headers": "Content-Type",
      "Access-Control-Request-Method": method,
    };
  };
}

function fetchOptions(method = "GET", data, noAuth) {
  let headers = {};
  if (noAuth === true) {
    headers = {
      ...Headers.contentTypeJson,
      ...Headers.accessControl(method),
    };
  } else {
    headers = {
      ...Headers.authorization,
      ...Headers.contentTypeJson,
      ...Headers.accessControl(method),
    };
  }
  if (data) {
    return {
      method: method,
      body: JSON.stringify(data),
      headers: headers,
    };
  } else {
    return {
      method: method,
      headers: headers,
    };
  }
}

const collectionsResource = "/collections";
const bookmarksResource = (collectionId) =>
  `${collectionsResource}/${collectionId}/bookmarks`;
const bookmarkResource = (collectionId, bookmarkId) =>
  `${bookmarksResource(collectionId)}/${bookmarkId}`;
const tagsResource = (bookmarkId) => `/bookmarks/${bookmarkId}/tags`;
const usersResource = "/users";

export function fetchCollections() {
  logInfo("fetchCollections()");
  return fetch(url(collectionsResource), fetchOptions());
}

export function fetchTypes(collectionId) {
  logInfo(`fetchTypes(${collectionId})`);
  return fetch(
    url(`${collectionsResource}/${collectionId}/types`),
    fetchOptions(),
  );
}

export function fetchBookmarks(collectionId, typeName) {
  logInfo(`fetchBookmarks(${collectionId}, ${typeName})`);
  const query = typeName ? `?type=${typeName}` : "";
  return fetch(
    url(`${bookmarksResource(collectionId)}${query}`),
    fetchOptions(),
  );
}

export function fetchBookmark(collectionId, bookmarkId) {
  logInfo(`fetchBookmark(${collectionId}, ${bookmarkId})`);
  return fetch(url(bookmarkResource(collectionId, bookmarkId)), fetchOptions());
}

export function searchBookmarks(collectionId, search) {
  logInfo(`searchBookmarks(${collectionId}, ${search})`);
  const queryParams = `${search}&match=name`;
  return fetch(
    url(`${bookmarksResource(collectionId)}?query=${queryParams}`),
    fetchOptions(),
  );
}

export function fetchTags(bookmarkId) {
  logInfo(`fetchTags(${bookmarkId})`);
  return fetch(url(tagsResource(bookmarkId)), fetchOptions());
}

export function deleteBookmark(collectionId, bookmarkId) {
  logInfo(`deleteBookmark(${collectionId}, ${bookmarkId})`);
  return fetch(
    url(bookmarkResource(collectionId, bookmarkId)),
    fetchOptions("DELETE"),
  );
}

export function updateBookmark(collectionId, bookmarkId, data) {
  logInfo(`updateBookmark(${collectionId}, ${bookmarkId})`);
  logVerbose("updateBookmark data: " + JSON.stringify(data));
  return fetch(
    url(bookmarkResource(collectionId, bookmarkId)),
    fetchOptions("PATCH", data),
  );
}

export function addTag(bookmarkId, tagBookmarkId) {
  logInfo(`addTag(${bookmarkId}, ${tagBookmarkId})`);
  return fetch(
    url(tagsResource(bookmarkId)),
    fetchOptions("POST", { tag_bookmark_id: tagBookmarkId }),
  );
}

export function deleteTag(bookmarkId, tagId) {
  logInfo(`deleteTag(${bookmarkId}, ${tagId})`);
  return fetch(
    url(`${tagsResource(bookmarkId)}/${tagId}`),
    fetchOptions("DELETE"),
  );
}

export function addBookmark(collectionId, data) {
  logInfo(`addBookmark(${collectionId})`);
  logVerbose("addBookmark data: " + JSON.stringify(data));
  return fetch(
    url(bookmarksResource(collectionId)),
    fetchOptions("POST", data),
  );
}

export function addCollection(data) {
  logInfo("addCollection()");
  logVerbose("addCollection data: " + JSON.stringify(data));
  return fetch(url(collectionsResource), fetchOptions("POST", data));
}

export function signup(email, password) {
  logInfo("signup(email, password)");
  return fetch(
    url(usersResource),
    fetchOptions("POST", { email: email, password: password }, true),
  );
}

export function login(email, password) {
  logInfo("login(email, password)");
  return fetch(
    url(`${usersResource}/login`),
    fetchOptions("POST", { email: email, password: password }, true),
  );
}
