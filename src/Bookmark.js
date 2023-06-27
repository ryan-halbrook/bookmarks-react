import css from './Bookmark.module.css';
import { useEffect } from 'react';

export default function Bookmark({bookmark, onSelect, setTopic, showInfo='type'}) {

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
                { showInfo == 'type' &&
                    <p className={css.topic} onClick={onTopicClick}>:{bookmark.type.name}</p>
                }
                { showInfo == 'description' &&
                    <p className={css.topic}>{bookmark.description}</p>
                }
            </div>
            <button onClick={showDetail}>Detail</button>
        </div>
    );
}
