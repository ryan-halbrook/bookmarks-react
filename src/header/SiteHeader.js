import Toolbar from './Toolbar';
import css from './SiteHeader.module.css';

export default function Header({
    onShowAddBookmark,
    onShowAddCollection,
    collections, collection,
    setCollection,
    setTopic,
    setSearch}) {

    return (
        <div className={css.header}>
            <Toolbar
                onShowAddBookmark={onShowAddBookmark}
                onShowAddCollection={onShowAddCollection}
                collections={collections}
                collection={collection}
                setCollection={setCollection}
                setTopic={setTopic}
                setSearch={setSearch}
            />
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
