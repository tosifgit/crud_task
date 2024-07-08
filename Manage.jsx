import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Manage = () => {
    const [myData, setData] = useState([]);
    const [formvalue, setFormvalue] = useState({
        id: "",
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await axios.get(`http://localhost:3000/user`)
        setData(res.data);
    }

    const dataDelet = async (id) => {
        const res = await axios.delete(`http://localhost:3000/user/${id}`)
        fetchData();
    }

    const edithandler = async (id) => {
        const res = await axios.get(`http://localhost:3000/user/${id}`)
        setFormvalue(res.data)
    }
    const changeHandler = (evt) => {
        setFormvalue({ ...formvalue, [evt.target.name]: evt.target.value });
    };

    const validation = () => {
        let result = true;
        if (!formvalue.name) {
            alert('Name Field is required !');
            return result = false;
        } else if (!formvalue.email) {
            alert('Email Field is required !');
            return result = false;
        } else if (!formvalue.password) {
            alert('Password Field is required !');
            return result = false;
        }
        return result;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (validation()) {
            const res = await axios.patch(`http://localhost:3000/user/${formvalue.id}`, formvalue);
            alert("Employee updated successfully");
            setFormvalue({ id: "", name: '', email: '', password: '' });
            fetchData();
        }
    };
    return (
        <>
            <div className="container mt-3">
                <table className="table table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myData.map((value) => (
                            <tr key={value.id}>
                                <td>{value.id}</td>
                                <td>{value.name}</td>
                                <td>{value.email}</td>
                                <td>{value.password}</td>
                                <td>
                                    <button onClick={() => dataDelet(value.id)} className='btn btn-danger'>Delete</button>
                                    <button data-bs-toggle="modal" onClick={() => edithandler(value.id)} data-bs-target="#myModal" className='btn btn-dark'>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal */}
                <div className="container">

                    {/* Modal start */}

                    <div className="modal fade" id="myModal">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h4 className="modal-title">Edit User</h4>
                                    <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
                                </div>

                                <div className="modal-body">
                                    <form method='get' onSubmit={submitHandler}>
                                        <div className="mb-3 mt-3">
                                            <label htmlFor="name" className="form-label">Name:</label>
                                            <input
                                                name="name"
                                                value={formvalue.name}
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
                                                value={formvalue.email}
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
                                                value={formvalue.password}
                                                onChange={changeHandler}
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                placeholder="Enter password"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                                    </form>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* Modal end */}
                </div>
                {/* Modal */}
            </div>
        </>
    )
}

export default Manage