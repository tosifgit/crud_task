import axios from 'axios';
import React, { useState } from 'react'

const Create = () => {
    const [newForm, setnewForm] = useState({
        id: "",
        name: "",
        email: "",
        password: ""
    });

    const changeHandler = (e) => {
        setnewForm({ ...newForm, id: new Date().getTime().toString(), [e.target.name]: e.target.value })
    }

    const validation = () => {
        var result = true;

        if (newForm.name == "" || newForm.name == null) {
            alert('Name Field is required !');
            return result = false;
        } else if (newForm.email == "" || newForm.email == null) {
            alert('email Field is required !');
            return result = false;
        } else if (newForm.password == "" || newForm.password == null) {
            alert('password Field is required !');
            return result = false;
        }
        return result;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (validation()) {
            const res = await axios.post(`http://localhost:3000/user`, newForm)
            setnewForm({
                id: "",
                name: "",
                email: "",
                password: ""
            });
        }
    }
    return (
        <>
            <div className='container mt-3'>
                <form onSubmit={submitHandler}>
                    <div className="mb-3 mt-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input
                            name="name"
                            value={newForm.name}
                            onChange={changeHandler}
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter name"
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            name="email"
                            value={newForm.email}
                            onChange={changeHandler}
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            name="password"
                            value={newForm.password}
                            onChange={changeHandler}
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Create