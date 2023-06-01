export default function Header({onShowAddBookmark}) {
    return (
       <div className="Header">
           <h1 className="Header-title">Bookmarks</h1>
           <div className="Add-button" onClick={onShowAddBookmark}>+ Bookmark</div>
       </div>
    );
}

