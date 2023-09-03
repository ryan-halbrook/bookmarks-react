import { useState } from 'react';
import css from './Signup.module.css';
import { signup, login } from '../client';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onEmail(event) {
        setEmail(event.target.value);
    }

    function onPassword(event) {
        setPassword(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();
        
        signup(email, password).then((response) => {
            if (response.status == 200) {
                login(email, password).then((response) => {
                    if (response.status == 200) {
                        response.json().then((json) => {
                            localStorage.setItem('email', json.email);
                            localStorage.setItem('token', json.token);
                            window.location.replace('/');
                        });
                    }
                });
            }
        });
    }

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={onSubmit}>

                <label htmlFor="email">Email: </label>
                <input type="text" name="email" required onChange={onEmail} />
                <label htmlFor="password">Password: </label>
                <input type="text" name="password" required onChange={onPassword} />
                <button type="button" onClick={() => { window.location.replace('/login') }} id="login">Login</button>
                <button id="save">Sign up</button>
            </form>
        </div>
    );
}