import css from "./CollectionPicker.module.css";
import AddCollectionForm from "./AddCollectionForm";
import { useState } from "react";

export default function CollectionPicker({
  collections,
  selectedCollection,
  onSelectCollection,
  onAddCollection,
}) {
  const [addModalVisible, setAddModalVisible] = useState(false);

  function onClickCollection(event) {
    const collectionAsInt = Number.parseInt(event.target.value);
    if (!Number.isNaN(collectionAsInt)) {
      onSelectCollection(collectionAsInt);
    }
  }

  let pickerValue = selectedCollection ? selectedCollection : "";

  return (
    <div className={css.collection}>
      {addModalVisible && (
        <AddCollectionForm
          onDismiss={() => setAddModalVisible(false)}
          onAdd={onAddCollection}
        />
      )}
      <span>
        <label htmlFor="collection-select">Collection: </label>
        <select value={pickerValue} onChange={onClickCollection} name="type">
          {collections.map((collection) => {
            return (
              <option
                key={collection.id}
                value={collection.id}
                label={collection.name}
              >
                {collection.id}
              </option>
            );
          })}
        </select>
      </span>
      <button onClick={() => setAddModalVisible(true)}>+ Collection</button>
    </div>
  );
}
