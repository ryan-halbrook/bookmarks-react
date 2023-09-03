import { useState } from 'react';
import { useEffect } from 'react';
import css from './Toolbar.module.css';
import { fetchTypes, fetchCollections } from '../client';

export default function Toolbar({onShowAddBookmark, onShowAddCollection, collection, setCollection, setTopic}) {
    const [topics, setTopics] = useState([]);
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        async function fetchTopics() {
            const response = await fetchTypes(collection);
            const data = await response.json();
            setTopics(data);
        }
        if (collection) {
            fetchTopics();
        }

        async function fetchData() {
            const response = await fetchCollections();
            const data = await response.json();
            setCollections(data);
        }

        fetchData();
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

    function logout(event) {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        window.location.replace('/login');
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
                <button onClick={onShowAddBookmark}>+ Bookmark</button>
                <button onClick={onShowAddCollection}>+ Collection</button>
            </div>
            <div className={css.email}>
                {localStorage.getItem('email')}
                
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    );
}
