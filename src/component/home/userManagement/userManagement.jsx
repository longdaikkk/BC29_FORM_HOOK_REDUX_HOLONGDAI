import React, { useState } from 'react'
import { useSelector} from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux/es/hooks/useDispatch';

export default function UserManagement() {
    const userList = useSelector(state => state.QuanLyReducer.userList);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        search: '',
        type: 'All',
    });

    const handleDelete = (id) => {
        dispatch({
            type: "DELETE_USER",
            payload: id,
        })
    }

    const handleEdit = (user) => {
        dispatch({
            type: "SELECT_USER",
            payload: user,
        })
    }

    const renderUserList = () => {
        let data = userList.filter(ele => {
            return (ele.fullName 
                .toLowerCase()
                .trim()
                .indexOf(state.search.toLowerCase().trim()) !== -1)
        });
        
        if(state.type !== 'All'){
            data = data.filter(ele => ele.type === state.type)
        }

        return data.map((ele, idx) => {
            return <tr className={`${idx % 2 === 0 ? 'bg-light': ''}`} key={idx}>
                <td>{idx}</td>
                <td>{ele.userName}</td>
                <td>{ele.fullName}</td>
                <td>{ele.email}</td>
                <td>{ele.phoneNumber}</td>
                <td>{ele.type}</td>
                <td><button onClick={() => {
                    handleEdit(ele)
                }} className="btn btn-info mr-2">EDIT</button>
                    <button onClick={() => {
                        handleDelete(ele.id)}
                        } className="btn btn-danger">DELETE</button></td>
            </tr>
        })
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setState({
            ...state,
            [name]: value,
        });
        console.log(state);
    }

    return (
        <>
            <div className="card-header font-weight-bold">USER MANAGEMENT</div>
            <div className="row mt-4 px-3 ">
                <div className="col-4">
                    <div className="form-group mb-0">
                        <input
                            name='search'
                            onChange={handleChange}
                            type="text"
                            placeholder="Search by full name..."
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="col-3 ml-auto">
                    <div className="form-group mb-0">
                        <select name='type' onChange={handleChange} className="form-control">
                            <option>All</option>
                            <option>Client</option>
                            <option>Admin</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Username</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Type</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderUserList()}
                    </tbody>
                </table>
            </div>
        </>
    )
}
