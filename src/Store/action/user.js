import { ADD_USER, UPDATE_USER } from "../type/type"

const addUserAction = (values) => {
    return{
        type: ADD_USER,
        payload: values,
    }
}

const updateUserAction = (values) => {
    return{
        type: UPDATE_USER,
        payload: values,
    }
}

export {
    addUserAction,
    updateUserAction,
}