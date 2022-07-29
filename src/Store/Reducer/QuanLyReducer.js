import { ADD_USER, DELETE_USER, SELECT_USER, UPDATE_USER } from "../type/type";

const DEFAULT_STATE = {
    userList:[
        {
            id: '1',
            userName: 'man.nguyen',
            fullName: 'Man Ng',
            passWord: '123456',
            phoneNumber: '085512123123',
            email: 'man.nguyen@gmail.com',
            type: 'Client',
        },
        {
            id: '2',
            userName: 'khai.tran',
            fullName: 'Khai Tran',
            passWord: '123456',
            phoneNumber: '085512456456',
            email: 'khai.tran@gmail.com',
            type: 'Admin',
        },
    ],
    selectUser: null,
}

export const QuanLyReducer = (state = DEFAULT_STATE, {type, payload}) => {
    switch (type) {
        case ADD_USER:{
            const data = [...state.userList];
            data.push({...payload, id: Date.now()});
            state.userList = data;
            return {...state}
        }

        case DELETE_USER: {
            let data = [...state.userList];
            data = data.filter(ele => ele.id !== payload)
            state.userList = data;
            return {...state}
        }
        case SELECT_USER:{
            state.selectUser = payload;
            console.log(state.selectUser);
            return {...state}
        }
        case UPDATE_USER:{
            const data = [...state.userList];
            const index = data.findIndex(ele => ele.id === payload.id);
            data[index] = payload;
            state.userList = data;
            state.selectUser = null;
            
            return {...state}
        }
        default:
            return state;
    }
}