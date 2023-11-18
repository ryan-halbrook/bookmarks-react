import css from './TypePicker.module.css';

export function TypePicker({types, onSelectType}) {
    return (
        <>
            <label htmlFor="type-select">Type: </label>
            <select onClick={onSelectType} name="type">
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


