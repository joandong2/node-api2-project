import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { postUser } from "../actions/articles";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AddForm = ({ postArticle, isLoaded, message }) => {
    const [formState, setFormState] = useState({
        name: "",
        bio: "",
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
        //console.log(formState);
        postArticle(formState);
        setFormState({
            name: "",
            bio: "",
        });
    };

    return (
        <div className="container">
            <p className="form-heading">Add Article</p>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <input type="text" name="name" placeholder="Name..." />
                </div>
                <div className="form-group">
                    <input type="text" name="bio" placeholder="Biography..." />
                </div>
                <button type="submit" class="btn btn-warning">
                    Submit
                </button>
            </form>
        </div>
    );
};

// hook up the connect to our store
const mapStateToProps = (state) => {
    //console.log("add form state", state);
    return {
        isLoaded: state.articles.isLoaded,
        message: state.articles.message,
    };
};

export default connect(mapStateToProps, { postUser })(AddForm);
