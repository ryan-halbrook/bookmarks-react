import Toolbar from './Toolbar';
import css from './SiteHeader.module.css';

export default function Header({onShowAddBookmark, onShowAddCollection, collection, setCollection, setTopic}) {
    return (
       <div className={css.header}>
           <h1 className={css.title}>Bookmarks</h1>
           <Toolbar onShowAddBookmark={onShowAddBookmark} onShowAddCollection={onShowAddCollection} collection={collection} setCollection={setCollection} setTopic={setTopic}/>
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