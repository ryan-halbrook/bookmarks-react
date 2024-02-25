import css from "./SiteHeader.module.css";
import TypePicker from "./TypePicker";
import CollectionPicker from "./CollectionPicker";
import AddBookmark from "./AddBookmark";
import SearchBar from "./SearchBar";
import UserStatus from "./UserStatus";

export default function SiteHeader({
  onAddBookmark,
  onAddCollection,
  collections,
  collection,
  setCollection,
  setType,
  setSearch,
}) {
  return (
    <div className={css.header}>
      <div className={css.toolbar}>
        <div className={css.left}>
          <h1 className={css.title}>Bookmarks</h1>
          <div className={css.filter}>
            <TypePicker collection={collection} onSelectType={setType} />
            <div>
              <SearchBar onSearch={setSearch} />
            </div>
          </div>
        </div>

        <div className={css.right}>
          <AddBookmark onAddBookmark={onAddBookmark} />
          <CollectionPicker
            collections={collections}
            selectedCollection={collection}
            onSelectCollection={setCollection}
            onAddCollection={onAddCollection}
          />
          <UserStatus />
        </div>
      </div>
    </div>
  );
}

export function LoggedOutHeader() {
  return (
    <div className={css.header}>
      <h1 className={css.title}>Bookmarks</h1>
    </div>
  );
}
