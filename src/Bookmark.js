import css from './Bookmark.module.css';

export default function Bookmark({bookmark, onSelect, setTopic}) {

    function showDetail() {
        onSelect(bookmark);
    }

    function onTopicClick() {
        setTopic(bookmark.type.name);
    }

    return (
        <div className={css.bookmark}>
            <div>
                <a className={css.name} href={bookmark.link} target="_blank">{bookmark.name}</a>
                <p className={css.topic} onClick={onTopicClick}>:{bookmark.type.name}</p>
                {/* <p className="Bookmark-description">{bookmark.description}</p> */}
            </div>
            {/* <a className="Bookmark-link" href={bookmark.link} target="_blank">Link</a> */}
            <button onClick={showDetail}>Detail</button>
        </div>
    );
}
