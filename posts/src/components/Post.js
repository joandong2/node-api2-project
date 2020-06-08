import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getPostById } from "../actions/posts.js";
import { getCommentsByPostId } from "../actions/posts.js";
import { addCommentByPostId } from "../actions/posts.js";

const Posts = (props) => {
    const {
        getPostById,
        getCommentsByPostId,
        addCommentByPostId,
        isLoaded,
        post,
        comments,
    } = props;

    useEffect(() => {
        getPostById(props.match.params.id);
        getCommentsByPostId(props.match.params.id);
    }, [getPostById, getCommentsByPostId, props.match.params.id]);

    const [formState, setFormState] = useState({
        text: "",
    });

    const inputChange = (e) => {
        e.persist();
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        // console.log(e.target.text.value);
        addCommentByPostId(props.match.params.id, e.target.text.value);
        setFormState({
            text: "",
        });
    };

    return (
        <>
            {isLoaded ? (
                <div className="post">
                    <div className="contents">
                        <h1>{post[0].title}</h1>
                        <p>{post[0].contents}</p>
                    </div>
                    <div className="comments">
                        <hr />
                        <form onSubmit={submitForm} className="form-inline">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="text"
                                    className="form-control"
                                    placeholder="Comment..."
                                    onChange={inputChange}
                                    value={formState.text}
                                />
                            </div>
                            <button type="submit" className="btn btn-warning">
                                Comment
                            </button>
                        </form>
                        <i>Comments...</i>
                        {comments.map((comment) => {
                            return <li key={comment.id}>{comment.text}</li>;
                        })}
                    </div>
                </div>
            ) : null}
        </>
    );
};

// hook up the connect to our store
const mapStateToProps = (state) => {
    console.log("posts component", state);
    return {
        isLoaded: state.posts.isLoaded,
        post: state.posts.post,
        comments: state.posts.comments,
        message: state.posts.message,
    };
};

export default connect(mapStateToProps, {
    getPostById,
    getCommentsByPostId,
    addCommentByPostId,
})(Posts);
