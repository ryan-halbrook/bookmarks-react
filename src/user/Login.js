import { useState } from "react";
import css from "../Modal.module.css";
import { login } from "../client";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onEmail(event) {
    setEmail(event.target.value);
  }

  function onPassword(event) {
    setPassword(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    login(email, password).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          localStorage.setItem("email", json.email);
          localStorage.setItem("token", json.token);
          window.location.replace("/");
        });
      }
    });
  }

  function register(event) {
    window.location.replace("/signup");
  }

  return (
    <>
      <div className={css.backdrop} />
      <dialog open className={css.modal}>
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email: </label>
          <input type="text" name="email" required onChange={onEmail} />
          <label htmlFor="password">Password: </label>
          <input type="text" name="password" required onChange={onPassword} />
          <button type="button" onClick={register} id="register">
            Sign Up
          </button>
          <button id="save">Login</button>
        </form>
      </dialog>
    </>
  );
}
