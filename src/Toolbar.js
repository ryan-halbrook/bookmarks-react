import { useState } from 'react';
import { useEffect } from 'react';
import css from './Toolbar.module.css';

export default function Toolbar({onShowAddBookmark, collection, setCollection, setTopic}) {
    const [topics, setTopics] = useState([]);
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        async function fetchTopics() {
            const response = await fetch('http://127.0.0.1:5000/collections/' + collection + '/types');
            const data = await response.json();
            setTopics(data);
        }

        fetchTopics();

        async function fetchCollections() {
            const response = await fetch('http://127.0.0.1:5000/collections');
            const data = await response.json();
            setCollections(data);
        }

        fetchCollections();
    }, [collection]);

    function onSelect(event) {
        setTopic(event.target.value); 
    }

    function onSelectCollection(event) {
        const collectionAsInt = Number.parseInt(event.target.value);
        if (!Number.isNaN(collectionAsInt)) {
            setCollection(collectionAsInt);
        }
    }

    return (
        <div className={css.toolbar}>
            <div>
                <label htmlFor="type-select">Type: </label>
                <select onClick={onSelect} name="type">
                    <option value={null} label="All">{null}</option>
                    {
                    topics.map((topic) => {
                        return <option key={topic.id} value={topic.name}>{topic.name}</option>;
                    })
                }</select>
            </div>
            <div>
                <label htmlFor="collection-select">Collection: </label>
                <select onClick={onSelectCollection} name="type">
                    {
                    collections.map((collection) => {
                        return <option key={collection.id} value={collection.id} label={collection.name}>{collection.id}</option>;
                    })
                }</select>
            </div>
            <button onClick={onShowAddBookmark}>+ Bookmark</button>
        </div>
    );
}
