export default function Modal({content, onDismiss}) {
    return (
        <>
            <div className="Modal" onClick={onDismiss}>
            </div>
            <div className="Modal-content">
                {content}
            </div>
        </>
    );
}