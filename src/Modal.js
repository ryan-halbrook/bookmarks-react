export default function Modal({children, onDismiss}) {
    return (
        <>
            <div className="Modal-backdrop" onClick={onDismiss} />
            <dialog open className="Modal">
                {children}
            </dialog>
        </>
    );
}