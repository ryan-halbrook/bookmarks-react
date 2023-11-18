import css from './CollectionPicker.module.css';

export function CollectionPicker({collections, onSelectCollection, onShowAddCollection}) {
    return (
        <div className={css.collection}>
            <span>
                <label htmlFor="collection-select">Collection: </label>
                <select onClick={onSelectCollection} name="type">
                    {
                    collections.map((collection) => {
                        return (
                            <option
                                key={collection.id}
                                value={collection.id}
                                label={collection.name}
                            >
                                {collection.id}
                            </option>
                       );
                    })
                }</select>
            </span>
            <button onClick={onShowAddCollection}>+ Collection</button>
        </div>
   );
}


