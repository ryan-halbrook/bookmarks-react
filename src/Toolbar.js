export default function Toolbar({onShowAddBookmark}) {
    return (
        <div className="Toolbar">
            <form>
                <div className="TextField">
                    <input type="text" name="search"/>
                </div>
            </form>
            <div>
                <label htmlFor="type-select">Type:</label>
                <select name="type">
                    <option value="">All</option>
                    <option value="">Language</option>
                    <option value="">Blog</option>
                </select>
            </div>
            <button onClick={onShowAddBookmark}>+ Bookmark</button>
        </div>
    );
}