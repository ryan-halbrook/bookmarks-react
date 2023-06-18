import { useState } from 'react';
import { useEffect } from 'react';
import css from './Toolbar.module.css';

export default function Toolbar({onShowAddBookmark, setTopic}) {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        async function fetchTopics() {
            const response = await fetch('http://127.0.0.1:5000/types');
            const data = await response.json();
            setTopics(data);
        }

        fetchTopics();
    }, []);

    function onSelect(event) {
        console.log(event);
        setTopic(event.target.value); 
    }

    return (
        <div className={css.toolbar}>
            <div>
                <label htmlFor="type-select">Type:</label>
                <select onClick={onSelect} name="type">
                    <option value={null} label="All">{null}</option>
                    {
                    topics.map((topic) => {
                        return <option value={topic.name}>{topic.name}</option>;
                    })
                }</select>
            </div>
            <button onClick={onShowAddBookmark}>+ Bookmark</button>
        </div>
    );
}
