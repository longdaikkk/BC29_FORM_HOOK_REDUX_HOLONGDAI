import React from 'react'
import RegisterForm from './registerForm/registerForm'
import UserManagement from './userManagement/userManagement'

export default function Home() {
    return (
        <div className="w-75 mx-auto mt-5">
            <div className="card p-0">
                <RegisterForm></RegisterForm>
            </div>
            <div className="card p-0 mt-3">
                <UserManagement></UserManagement>
            </div>
        </div>
    )
}
