import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credential, setCredential] = useState({ email: "", password: "" });
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            // redirect
            localStorage.setItem('token', json.authtoken);
            history("/");
        } else {
            alert('Invail Credential.');
        }
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div className='container card-outline'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credential.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credential.password} onChange={onChange} id="password" name='password' />
                </div>
                <button type="submit" className="btn btn-primary"  >Submit</button>
            </form>
        </div>
    )
}

export default Login