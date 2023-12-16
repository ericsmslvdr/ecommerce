import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthentication } from "../../hooks"

const Signup = () => {
    const { errorMsg, successMsg, handleSignup } = useAuthentication()

    const [formData, setFormData] = useState({
        fullName: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await handleSignup(formData.email, formData.password, formData.fullName)
        if (res && res.status === "succes") {
            setFormData({
                fullName: '',
                email: '',
                password: ''
            })
        }
    }

    return (
        <div className="container w-50">
            {errorMsg && <div className="alert alert-danger mt-4">{errorMsg}</div>}
            {successMsg && <div className="alert alert-success mt-4">{successMsg}</div>}
            <br />
            <h1>Sign Up</h1>
            <hr />
            <form
                className="form-group"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <label>Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    required
                    onChange={handleOnChange}
                    value={formData.fullName}
                />
                <br />
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    required
                    onChange={handleOnChange}
                    value={formData.email}
                />
                <br />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    required
                    onChange={handleOnChange}
                    value={formData.password}
                />
                <br />
                <div className="btn-box">
                    <span>Already have an account? <Link to={"/login"} className="link">Login</Link></span>
                    <button
                        type="submit"
                        className="button signup-btn"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Signup