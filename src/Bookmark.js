export default function Bookmark({bookmark, onSelect, setTopic}) {

    function showDetail() {
        onSelect(bookmark);
    }

    function onTopicClick() {
        setTopic(bookmark.topic.name);
    }

    return (
        <div className="Bookmark">
            <div>
                <a className="Bookmark-name" href={bookmark.link} target="_blank">{bookmark.name}</a>
                <p className="Bookmark-topic" onClick={onTopicClick}>:{bookmark.topic.name}</p>
            </div>
            {/* <p className="Bookmark-description">{bookmark.description}</p> */}
            {/* <a className="Bookmark-link" href={bookmark.link} target="_blank">Link</a> */}
            <button onClick={showDetail}>Detail</button>
        </div>
    );
}
