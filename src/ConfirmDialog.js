
export default function ConfirmDialog({children, onConfirm, onCancel}) {
    
    function onSubmit(event) {
        event.preventDefault();
        onConfirm();
        onCancel();
    }

    return (
        <form onSubmit={onSubmit}>
            <p>
                {children}
            </p>
            <button type="button" onClick={onCancel}>Cancel</button>
            <button type="submit">Delete</button>
        </form>
    );
}
