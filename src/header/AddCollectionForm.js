import { useState } from 'react';
import Modal from '../Modal';


export default function AddCollectionForm({onAdd, onDismiss}) {
    const [name, setName] = useState('');

    function onName(event) {
        setName(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();
        onAdd({ 'name': name });
        onDismiss();
    }

    return (
        <Modal onDismiss={onDismiss}>

            <form onSubmit={onSubmit}>
                <p>Add Collection</p>

                <label htmlFor="name">Name: </label>
                <input type="text" name="name" required onChange={onName}/>
                <button type="button" onClick={onDismiss}>Cancel</button>
                <button id="save">Save</button>
            </form>
        </Modal>
    );
}
