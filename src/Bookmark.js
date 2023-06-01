export default function Bookmark({bookmark}) {
    return (
        <div className="Bookmark">
            <div>
                <h2 className="Bookmark-name">{bookmark.name}</h2>
                <p className="Bookmark-topic">:{bookmark.topic.name}</p>
            </div>
            {/* <p className="Bookmark-description">{bookmark.description}</p> */}
            <a className="Bookmark-link" href={bookmark.link} target="_blank">Link</a>
        </div>
    );
}
