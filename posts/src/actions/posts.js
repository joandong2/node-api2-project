import axios from "axios";

export const ACTION_START = "ACTION_START";
export const ACTION_ERROR = "ACTION_ERROR";
export const GET_POSTS = "GET_POSTS";
export const GET_POST_BY_ID = "GET_POST_BY_ID";
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const GET_COMMENTS_BY_POST_ID = "GET_COMMENTS_BY_POST_ID";
export const ADD_COMMENTS_BY_POST_ID = "ADD_COMMENTS_BY_POST_ID";

const URL = "http://localhost:8080/api";

export const getPosts = () => (dispatch) => {
    dispatch({ type: ACTION_START });

    axios
        .get(`${URL}/posts`)
        .then((res) => {
            //console.log("axios result", res);
            dispatch({ type: GET_POSTS, payload: res.data });
        })
        .catch((err) => {
            //console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in get request articles.",
            });
        });
};

export const getPostById = (id) => (dispatch) => {
    dispatch({ type: ACTION_START });

    axios
        .get(`${URL}/posts/${id}`)
        .then((res) => {
            //console.log("axios result", res);
            dispatch({ type: GET_POST_BY_ID, payload: res.data });
        })
        .catch((err) => {
            //console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in get request articles.",
            });
        });
};

export const getCommentsByPostId = (id) => (dispatch) => {
    dispatch({ type: ACTION_START });

    axios
        .get(`${URL}/posts/${id}/comments`)
        .then((res) => {
            //console.log("axios result", res);
            dispatch({ type: GET_COMMENTS_BY_POST_ID, payload: res.data });
        })
        .catch((err) => {
            //console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in get request comments by id.",
            });
        });
};

export const addPost = (values) => (dispatch) => {
    dispatch({ type: ACTION_START });

    axios
        .post(`${URL}/posts`, values)
        .then((res) => {
            dispatch({ type: ADD_POST, payload: res.data[0] });
        })
        .catch((err) => {
            //console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in adding new POST.",
            });
        });
};

export const addCommentByPostId = (id, values) => (dispatch) => {
    console.log(values);
    dispatch({ type: ACTION_START });

    axios
        .post(`${URL}/posts/${id}/comments`, {
            post_id: id,
            text: values,
        })
        .then((res) => {
            //console.log("axios result", res);
            dispatch({ type: ADD_COMMENTS_BY_POST_ID, payload: res.data });
        })
        .catch((err) => {
            //console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in get request comments by id.",
            });
        });
};

export const updatePost = (id, values) => (dispatch) => {
    console.log(values);
    dispatch({ type: ACTION_START });

    axios
        .put(`${URL}/posts/${id}`, values)
        .then((res) => {
            //console.log("update res", res);
            dispatch({ type: UPDATE_POST, payload: res.data });
        })
        .catch((err) => {
            //console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in adding new POST.",
            });
        });
};

export const deletetPost = (id) => (dispatch) => {
    dispatch({ type: ACTION_START });

    axios
        .delete(`${URL}/posts/${id}`)
        .then((res) => {
            //console.log("axios get by id result", res);
            dispatch({ type: DELETE_POST });
        })
        .catch((err) => {
            //console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in deleting article by id.",
            });
        });
};
