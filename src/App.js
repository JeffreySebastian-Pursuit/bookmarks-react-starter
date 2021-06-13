// DEPENDENCIES

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

// PAGES
import Edit from "./Pages/Edit";
import FourOFour from "./Pages/FourOFour";
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import New from "./Pages/New";
import Show from "./Pages/Show";

// COMPONENTS
import NavBar from "./Components/NavBar";
import { apiURL } from "./util/apiURL";

const API = apiURL();

function App() {
  const [bookmarks, setBookmarks] = useState([]);

  const addBookmark = async (newBookmark) => {
    try {
      const res = await axios.post(`${API}/bookmarks`, newBookmark);
      setBookmarks([...bookmarks, res.data]);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteBookmark = async (index) => {
    try {
      await axios.delete(`${API}/bookmarks/${index}`);
      const deleteIndex = [...bookmarks];
      deleteIndex.splice(index, 1);
      setBookmarks(deleteIndex);
    } catch (err) {
      console.log(err);
    }
  };

  const updateBookmark = async (updatedBookmark, index) => {
    try {
      await axios.get(`${API}/bookmarks/${index}`, updatedBookmark);
      const newBookmark = [...bookmarks];
      newBookmark[index] = updatedBookmark;
      setBookmarks(newBookmark);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBookMarks = async () => {
    console.log(process);
    let res;
    try {
      res = await axios.get(`${API}/bookmarks`);
      // console.log("MArker1", res);
      setBookmarks(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(async () => {
    fetchBookMarks();
  }, []);
  return (
    <div className="App">
      <Router>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/bookmarks">
              <Index bookmarks={bookmarks} />
            </Route>
            <Route path="/bookmarks/new">
              <New addBookmark={addBookmark} />
            </Route>
            <Route exact path="/bookmarks/:index">
              <Show deleteBookmark={deleteBookmark} />
            </Route>
            <Route path="/bookmarks/:index/edit">
              <Edit updateBookmark={updateBookmark} />
            </Route>
            <Route path="*">
              <FourOFour />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
