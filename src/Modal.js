import css from "./Modal.module.css";

export default function Modal({ children, onDismiss }) {
  return (
    <>
      <div className={css.backdrop} onClick={onDismiss} />
      <dialog open className={css.modal}>
        {children}
      </dialog>
    </>
  );
}
