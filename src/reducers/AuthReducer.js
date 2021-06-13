import {
    TRIGGER_LOGIN,
    TRIGGER_LOGIN_SUCCESS,
    TRIGGER_LOGIN_FAILED,

    TRIGGER_REGISTER,
    TRIGGER_REGISTER_SUCCESS,
    TRIGGER_REGISTER_FAILED,
    

} from '../actions'

// import { persistor } from '../../src/store';

const initialState = {
    registerObj: {
        loading: false,
        data: [],
        error: null
    },
    loginObj: {
        loading: false,
        data: [],
        error: null
    },
    
}

const authReducer = function (state = initialState, action) {
    switch (action.type) {
        case TRIGGER_LOGIN:
            return {
                ...state,
                registerObj: {
                    loading: true,
                    data: [],
                    error: null
                }
            }
        case TRIGGER_LOGIN_SUCCESS:
            return {
                ...state,
                registerObj: {
                    loading: false,
                    data: action.payload,
                    error: null
                },
                isLoggedIn: true
            }
            case TRIGGER_LOGIN_FAILED:
                return {
                    ...state,
                    registerObj: {
                        loading: false,
                        data: action.payload,
                        error: null
                    },
                    isLoggedIn: true
                }

                

                case TRIGGER_REGISTER:
                    return {
                        ...state,
                        registerObj: {
                            loading: true,
                            data: [],
                            error: null
                        }
                    }
                case TRIGGER_REGISTER_SUCCESS:
                    return {
                        ...state,
                        registerObj: {
                            loading: false,
                            data: action.payload,
                            error: null
                        },
                        isLoggedIn: true
                    }
                    case TRIGGER_REGISTER_FAILED:
                        return {
                            ...state,
                            registerObj: {
                                loading: false,
                                data: action.payload,
                                error: null
                            },
                            isLoggedIn: true
                        }
         
        default:
            return state
    }
}

export default authReducer;