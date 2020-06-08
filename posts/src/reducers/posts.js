import {
    ACTION_START,
    ACTION_ERROR,
    GET_POSTS,
    GET_POST_BY_ID,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    GET_COMMENTS_BY_POST_ID,
    ADD_COMMENTS_BY_POST_ID,
} from "../actions/posts";

const initialState = {
    post: null,
    posts: [],
    isLoading: false,
    isLoaded: false,
    message: null,
    comments: [],
};

export function posts(state = initialState, action) {
    switch (action.type) {
        case ACTION_START:
            return {
                ...state,
                isLoading: true,
                isLoaded: false,
            };
        case ACTION_ERROR:
            return {
                ...state,
                isLoading: false,
                isLoaded: false,
                message: action.payload,
            };
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                isLoading: false,
                isLoaded: true,
            };
        case GET_POST_BY_ID:
            return {
                ...state,
                post: action.payload,
                isLoading: false,
                isLoaded: true,
            };
        case ADD_POST:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                posts: [...state.posts, action.payload],
            };
        case UPDATE_POST:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
            };
        case DELETE_POST:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
            };
        case GET_COMMENTS_BY_POST_ID:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                comments: action.payload,
            };
        case ADD_COMMENTS_BY_POST_ID:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                comments: action.payload,
            };
        default:
            return state;
    }
}
