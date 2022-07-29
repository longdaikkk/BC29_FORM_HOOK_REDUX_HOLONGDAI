import React, { useEffect, useState } from 'react';
import { createRef } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { addUserAction, updateUserAction } from '../../../Store/action/user';

export default function RegisterForm() {
    const DEFAULT_VALUES = {
        userName: '',
        fullName: '',
        passWord: '',
        phoneNumber: '',
        email: '',
        type: '',
    }

    const formRef = createRef();

    const dispatch = useDispatch();
    const userSelected = useSelector(state => state.QuanLyReducer.selectUser);

    const userList = useSelector(state => state.QuanLyReducer.userList);

    useEffect(() => {
        if (userSelected) {
            setState({
                values: userSelected,
            })
        };
    }, [userSelected])

    const [state, setState] = useState({
        values: DEFAULT_VALUES,
    });

    const [error, setError] = useState({});

    const [disabled, setDisabled] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setState({
            values: {
                ...state.values,
                [name]: value,
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!event.target.checkValidity()) {
            return;
        }
        console.log(userSelected);
        if (!userSelected) {
            dispatch(addUserAction(state.values))
        } else {
            dispatch(updateUserAction(state.values))
        }

        setState({
            values: DEFAULT_VALUES,
        })

        setDisabled(false);
    }

    const handleBlur = (event) => {
        const { name, title, maxLength, minLength, validity } = event.target;
        const { valueMissing, tooLong, tooShort, patternMismatch } = validity;
        let mess = '';

        if (name === 'userName') {
            const index = userList.findIndex(ele => ele.userName === state.values.userName);
            if (index !== -1) {
                mess = `${title} is duplicated.`
            }
        }

        if (patternMismatch) {
            mess = `${title} is invalid pattern.`
        }

        if (tooLong || tooShort) {
            mess = `${title} from ${minLength} to ${maxLength} characters`
        }

        if (valueMissing) {
            mess = `${title} is required`;
        }

        setError({
            ...error,
            [name]: mess,
        })

        setDisabled(formRef.current?.checkValidity());
    }

    const { userName, fullName, passWord, phoneNumber, type, email } = state.values || {};
    return (
        <>
            <div className="card-header bg-warning text-white font-weight-bold">
                REGISTER FORM
            </div>
            <div className="card-body">
                <form ref={formRef} noValidate onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label>Username</label>
                                <input value={userName} required title='Username' name='userName' onBlur={handleBlur} onChange={handleChange} type="text" className="form-control" />
                                {
                                    error.userName && <span className='text-danger'>{error.userName}</span>
                                }
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input value={fullName} required title='Full name' name='fullName' onBlur={handleBlur} onChange={handleChange} type="text" className="form-control" />
                                {
                                    error.fullName && <span className='text-danger'>{error.fullName}</span>
                                }
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Password</label>
                                <input maxLength={10} minLength={6} value={passWord} required title='Password' name='passWord' onBlur={handleBlur} onChange={handleChange} type="text" className="form-control" />
                                {
                                    error.passWord && <span className='text-danger'>{error.passWord}</span>
                                }
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input value={phoneNumber} required title='Phone Number' name='phoneNumber' onBlur={handleBlur} onChange={handleChange} type="number" className="form-control" />
                                {
                                    error.phoneNumber && <span className='text-danger'>{error.phoneNumber}</span>
                                }
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Email</label>
                                <input value={email} required title='Email' name='email' onBlur={handleBlur} onChange={handleChange} pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$' type="text" className="form-control" />
                                {
                                    error.email && <span className='text-danger'>{error.email}</span>
                                }
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Type</label>
                                <select required title='Type' value={type} name='type' onBlur={handleBlur} onChange={handleChange} className="form-control">
                                    <option>Client</option>
                                    <option>Admin</option>
                                </select>
                                {
                                    error.type && <span className='text-danger'>{error.type}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        <button disabled={!disabled} type='submit' className="btn btn-warning mr-2">SAVE</button>
                        <button type='reset' className="btn btn-outline-dark">RESET</button>
                    </div>
                </form>
            </div>

        </>
    )
}
