import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Posts from "./components/Posts.js";
import Post from "./components/Post.js";

function App() {
    return (
        <Router>
            <div className="App container">
                <nav>
                    <Link to="/">All Posts</Link>
                </nav>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(props) => <Posts {...props} />}
                    />
                    <Route
                        exact
                        path="/:id"
                        render={(props) => <Post {...props} />}
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
