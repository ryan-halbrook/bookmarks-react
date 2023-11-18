import { useState } from 'react';
import { useEffect } from 'react';
import css from './Toolbar.module.css';
import { fetchTypes } from '../client';
import { TypePicker } from './TypePicker.js'
import { CollectionPicker } from './CollectionPicker.js'

export default function Toolbar({
    onShowAddBookmark,
    onShowAddCollection,
    collections,
    collection,
    setCollection,
    setType,
    setSearch}) {

    const [types, setTypes] = useState([]);
    const [searchEntered, setSearchEntered] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetchTypes(collection);
            const data = await response.json();
            setTypes(data);
        }
        if (collection) {
            fetchData();
        }
    }, [collection]);

    function onSelectType(event) {
        setType(event.target.value);
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

    function search() {
        return (
            <form onSubmit={onSearch}>
                <label htmlFor="search">Search </label>
                <input type="text" onChange={onSearchEntered}></input>
            </form>
        );
    }

    return (
        <div className={css.toolbar}>
            <div className={css.left}>
                <h1 className={css.title}>Bookmarks</h1>
                <div className={css.filter}>
                    <TypePicker types={types} onSelectType={onSelectType}/>
                    <div>
                        {search()}
                    </div>
                </div>
            </div>

            <div className={css.right}>
                <div className={css.addBookmark}>
                    <button onClick={onShowAddBookmark}>+ Bookmark</button>
                </div>
                <CollectionPicker
                    collections={collections}
                    onSelectCollection={onSelectCollection}
                    onShowAddCollection={onShowAddCollection}
                />
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
