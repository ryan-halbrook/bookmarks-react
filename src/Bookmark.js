export default function Bookmark({bookmark, onSelect}) {

    function showDetail() {
        onSelect(bookmark);
    }

    return (
        <div className="Bookmark">
            <div>
                <a className="Bookmark-name" href={bookmark.link} target="_blank">{bookmark.name}</a>
                <p className="Bookmark-topic">:{bookmark.topic.name}</p>
            </div>
            {/* <p className="Bookmark-description">{bookmark.description}</p> */}
            {/* <a className="Bookmark-link" href={bookmark.link} target="_blank">Link</a> */}
            <button onClick={showDetail}>Detail</button>
        </div>
    );
}
