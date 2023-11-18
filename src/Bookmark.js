import css from './Bookmark.module.css';

export default function Bookmark({
    bookmark, onSelect, setTopic, showInfo='type', selected=false, detailButton=true}) {

    function showDetail() {
        onSelect(bookmark);
    }

    function onTopicClick() {
        setTopic(bookmark.type.name);
    }

    return (
        <div className={css.bookmark}>
            <div>
                <a className={css.name}
                   href={bookmark.link}
                   target="_blank"
                   rel="noreferrer">
                {bookmark.name}
                </a>
                { showInfo === 'type' &&
                    <p className={css.topic}
                       onClick={onTopicClick}>
                    :{bookmark.type.name}
                    </p>
                }
                { showInfo === 'description' &&
                    <p className={css.topic}>{bookmark.description}</p>
                }
            </div>
            {selected ? (
                <button className={css.selectedButton}>Detail</button>
            ) : (
                <button onClick={showDetail}>Detail</button>
            )}
        </div>
    );
}
