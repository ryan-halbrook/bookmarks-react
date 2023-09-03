import { useState } from 'react'

export default function AddCollectionForm({onAddCollection, onDismiss}) {
    const [name, setName] = useState('');

    function onName(event) {
        setName(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();
        console.log('Submit');
        onAddCollection({
            'name': name,
        });
        onDismiss();
    }

    return (
        <form onSubmit={onSubmit}>
            <p>
                Add Collection
            </p>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" required onChange={onName}/>
            <button type="button" onClick={onDismiss}>Cancel</button>
            <button id="save">Save</button>
        </form>
    );
}
