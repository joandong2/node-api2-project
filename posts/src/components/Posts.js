import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../actions/posts.js";
import { getPostById } from "../actions/posts.js";
import { addPost } from "../actions/posts.js";
import { updatePost } from "../actions/posts.js";
import { deletetPost } from "../actions/posts.js";

const Posts = ({
    getPosts,
    getPostById,
    addPost,
    updatePost,
    deletetPost,
    isLoaded,
    posts,
    post,
    message,
}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    const [editState, setEditState] = useState(false);
    const [formState, setFormState] = useState({
        title: "",
        contents: "",
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
        if (editState) {
            updatePost(post[0].id, formState);
            window.location.replace("/");
        } else {
            addPost(formState);
        }
        setEditState(false);
        setFormState({
            title: "",
            contents: "",
        });
    };

    return (
        <div className="row">
            <div className="col-md-3">
                <div className="new-user">
                    <form onSubmit={submitForm}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                placeholder="Title..."
                                onChange={inputChange}
                                value={formState.title}
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="contents"
                                className="form-control"
                                placeholder="Contents..."
                                onChange={inputChange}
                                value={formState.contents}
                                rows="10"
                            />
                        </div>
                        <button type="submit" className="btn btn-warning">
                            {editState ? "Update" : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
            <div className="col-md-9">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Post title</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoaded
                            ? posts.map((post) => (
                                  <tr key={post.id}>
                                      <td>
                                          {post.title.substr(0, 40) + "..."}
                                      </td>

                                      <td>
                                          <a
                                              className="btn btn-info btn-sm"
                                              href={`/${post.id}`}
                                          >
                                              View
                                          </a>
                                          <button
                                              onClick={() => {
                                                  setEditState(true);
                                                  getPostById(post.id);
                                                  setFormState({
                                                      title:
                                                          isLoaded &&
                                                          post != null
                                                              ? post.title
                                                              : "",
                                                      contents:
                                                          isLoaded &&
                                                          post != null
                                                              ? post.contents
                                                              : "",
                                                  });
                                              }}
                                              className="btn btn-info btn-sm"
                                          >
                                              Edit
                                          </button>
                                          <button
                                              //type="button"
                                              onClick={(e) => {
                                                  e.preventDefault();
                                                  deletetPost(post.id);
                                                  window.location.replace("/");
                                              }}
                                              className="btn btn-danger btn-sm"
                                          >
                                              Delete
                                          </button>
                                      </td>
                                  </tr>
                              ))
                            : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// hook up the connect to our store
const mapStateToProps = (state) => {
    console.log("posts component", state);
    return {
        isLoaded: state.posts.isLoaded,
        post: state.posts.post,
        posts: state.posts.posts,
        message: state.posts.message,
    };
};

export default connect(mapStateToProps, {
    getPosts,
    getPostById,
    addPost,
    updatePost,
    deletetPost,
})(Posts);
