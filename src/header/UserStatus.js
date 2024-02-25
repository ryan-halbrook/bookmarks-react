import css from "./UserStatus.module.css";

export default function UserStatus() {
  function logout(event) {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    window.location.replace("/login");
  }

  return (
    <div className={css.email}>
      <div>{localStorage.getItem("email")}</div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
