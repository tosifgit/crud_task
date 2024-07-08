import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EmployeTable = () => {
    const [myData, setData] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await axios.get(`http://localhost:3000/user`);
        setData(res.data);
    };

    const [formVal, setFormVal] = useState({
        id: "",
        name: "",
        email: "",
        number: "",
        password: "",
    });

    const changhandler = (e) => {
        const { name, value } = e.target;
        if (isUpdate) {
            setFormVal({ ...formVal, [name]: value });
        } else {
            setFormVal({ ...formVal, id: new Date().getTime().toString(), [name]: value });
        }
    };

    const DeleteData = async (id) => {
        await axios.delete(`http://localhost:3000/user/${id}`);
        fetchData();
    };

    const getId = async (id) => {
        const res = await axios.get(`http://localhost:3000/user/${id}`);
        setFormVal(res.data);
        setIsUpdate(true);
    };

    const validation = () => {
        let result = true;
        if (!formVal.name) {
            alert('Name Field is required !');
            result = false;
        } else if (!formVal.email) {
            alert('Email Field is required !');
            result = false;
        } else if (!formVal.password) {
            alert('Password Field is required !');
            result = false;
        } else if (!formVal.number) {
            alert('Number Field is required !');
            result = false;
        }
        return result;
    };

    const submithandler = async (e) => {
        e.preventDefault();
        if (validation()) {
            await axios.post(`http://localhost:3000/user`, formVal);
            alert("Data Added Successfully");
            setFormVal({
                id: "",
                name: "",
                email: "",
                number: "",
                password: "",
            });
            fetchData();
        }
    };

    const updateHandler = async (e) => {
        e.preventDefault();
        if (validation()) {
            await axios.patch(`http://localhost:3000/user/${formVal.id}`, formVal);
            alert("Data Updated Successfully");
            setFormVal({
                id: "",
                name: "",
                email: "",
                number: "",
                password: "",
            });
            fetchData();
        }
        setIsUpdate(false);
    };

    const adder = () => {
        setFormVal({
            id: "",
            name: "",
            email: "",
            number: "",
            password: "",
        });
        setIsUpdate(false);
    };

    return (
        <div className="container mt-3">
            <h2>Employe Table <button data-bs-toggle="modal" data-bs-target="#myModal" className="btn btn-warning" onClick={adder}>Add Employee</button></h2>
            <hr />
            <br />
            <table className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {myData.map((val) => (
                        <tr key={val.id}>
                            <td>{val.id}</td>
                            <td>{val.name}</td>
                            <td>{val.email}</td>
                            <td>{val.number}</td>
                            <td>{val.password}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => DeleteData(val.id)}>Delete</button>
                                <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => getId(val.id)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            <div className="modal fade" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{isUpdate ? 'Edit User' : 'Add User'}</h4>
                            <button type="button" className="close" onClick={adder} data-bs-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3 mt-3">
                                    <label htmlFor="name" className="form-label">Name:</label>
                                    <input
                                        name="name"
                                        value={formVal.name}
                                        onChange={changhandler}
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
                                        value={formVal.email}
                                        onChange={changhandler}
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="number" className="form-label">Number:</label>
                                    <input
                                        name="number"
                                        value={formVal.number}
                                        onChange={changhandler}
                                        type="number"
                                        className="form-control"
                                        id="number"
                                        placeholder="Enter number"
                                    />
                                    <label htmlFor="password" className="form-label">Password:</label>
                                    <input
                                        name="password"
                                        value={formVal.password}
                                        onChange={changhandler}
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter password"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={isUpdate ? updateHandler : submithandler}>Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={adder} data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeTable;
