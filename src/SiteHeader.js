import Toolbar from './Toolbar'

export default function Header({onShowAddBookmark}) {
    return (
       <div className="Header">
           <h1 className="Header-title">Bookmarks</h1>
           <Toolbar onShowAddBookmark={onShowAddBookmark}/>
       </div>
    );
}

