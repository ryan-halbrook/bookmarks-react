import Toolbar from './Toolbar';
import css from './SiteHeader.module.css';

export default function Header({onShowAddBookmark, collection, setCollection, setTopic}) {
    return (
       <div className={css.header}>
           <h1 className={css.title}>Bookmarks</h1>
           <Toolbar onShowAddBookmark={onShowAddBookmark} collection={collection} setCollection={setCollection} setTopic={setTopic}/>
       </div>
    );
}
