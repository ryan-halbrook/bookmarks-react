import { useState, useEffect } from 'react';
import { fetchTypes } from '../client';


export default function TypePicker({collection, onSelectType}) {
    const [types, setTypes] = useState([]);

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

    function onClickType(event) {
        onSelectType(event.target.value);
    }

    return (
        <>
            <label htmlFor="type-select">Type: </label>
            <select onClick={onClickType} name="type">
                <option value={null} label="All">{null}</option>
                {
                    types.map((type) => {
                        return (
                            <option
                                key={type.id}
                                value={type.name}
                            >
                            {type.name}
                            </option>
                        );
                    })
                }
            </select>
        </>
   );
}


