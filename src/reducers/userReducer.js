import { 
    USER_LOADING,
    USER_LOADED,
    USER_LOADING_ERROR,
    SHORTLIST_USER,
    REJECT_USER
} from '../action/types';

const initalState = {
    isLoading: false,
    isLoaded: false,
    error_msg: null,
    user: []
};

export default function(state = initalState, action) {
    switch(action.type) {
        case USER_LOADING_ERROR:
            return {
                ...state,
                isLoading: false,
                isLoaded: false,
                error_msg: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error_msg: null,
                user: action.payload
            };
        case SHORTLIST_USER:
            return {
                ...state,
                user: state.user.map(user => 
                    user.id===action.payload ? {...user, status:'Shortlisted'} : user
                )
            }
        case REJECT_USER:
            return {
                ...state,
                user: state.user.map(user =>
                    user.id===action.payload ? {...user, status:'Rejected'} : user
                )
            }
        default:
            return state;
    }
}
