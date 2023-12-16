import { Link } from "react-router-dom"
import { useAuthentication } from "../../hooks"
import { useState } from "react"

const Login = () => {
    const { errorMsg, successMsg, handleLogin } = useAuthentication()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleLogin(formData.email, formData.password)
        console.log("LOGINNN PAGE!");
    }

    console.log(formData.email);
    return (
        <div className="container w-50">
            {errorMsg && <div className="alert alert-danger mt-4">{errorMsg}</div>}
            {successMsg && <div className="alert alert-success mt-4">{successMsg}</div>}
            <br />
            <h1>Login</h1>
            <hr />
            <form
                className="form-group"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <label>Email</label>
                <input
                    type="email"
                    name='email'
                    className="form-control  form-control"
                    required
                    onChange={handleOnChange}
                    value={formData.email}
                />
                <br />
                <label>Password</label>
                <input
                    type="password"
                    name='password'
                    className="form-control form-control"
                    required
                    onChange={handleOnChange}
                    value={formData.password}
                />
                <br />
                <div className="btn-box">
                    <span>
                        Don't have an account? &nbsp;
                        <Link
                            to={"/signup"}
                            className="link"
                        >
                            Sign Up
                        </Link>
                    </span>
                    <button
                        type="submit"
                        className="button login-btn"
                    >
                        LOGIN
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login