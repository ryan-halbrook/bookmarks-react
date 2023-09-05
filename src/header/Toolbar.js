import { useState } from 'react';
import { useEffect } from 'react';
import css from './Toolbar.module.css';
import { fetchTypes, fetchCollections } from '../client';

export default function Toolbar({onShowAddBookmark, onShowAddCollection, collection, setCollection, setTopic, setSearch}) {
    const [topics, setTopics] = useState([]);
    const [collections, setCollections] = useState([]);
    const [searchEntered, setSearchEntered] = useState([]);

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

    function onSearchEntered(event) {
        setSearchEntered(event.target.value);
    }

    function onSearch(event) {
        event.preventDefault();
        setSearch(searchEntered);
    }

    return (
        <div className={css.toolbar}>
            <div className={css.left}>
                <h1 className={css.title}>Bookmarks</h1>
                <div className={css.filter}>
                    <label htmlFor="type-select">Type: </label>
                    <select onClick={onSelect} name="type">
                        <option value={null} label="All">{null}</option>
                        {
                        topics.map((topic) => {
                            return <option key={topic.id} value={topic.name}>{topic.name}</option>;
                        })
                    }</select>
                    <div>
                        <form onSubmit={onSearch}>
                            <label htmlFor="search">Search </label>
                            <input type="text" onChange={onSearchEntered}></input>
                        </form>
                    </div>
                </div>
            </div>

            <div className={css.right}>
                <div className={css.addBookmark}>
                    <button onClick={onShowAddBookmark}>+ Bookmark</button>
                </div>
                <div className={css.collection}>
                    <span>
                        <label htmlFor="collection-select">Collection: </label>
                        <select onClick={onSelectCollection} name="type">
                            {
                            collections.map((collection) => {
                                return <option key={collection.id} value={collection.id} label={collection.name}>{collection.id}</option>;
                            })
                        }</select>
                    </span>
                    <button onClick={onShowAddCollection}>+ Collection</button>
                </div>
                <div className={css.email}>
                    <div>
                        {localStorage.getItem('email')}
                    </div>
                    <div>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
