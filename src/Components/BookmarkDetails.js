import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios'

const API = process.env.REACT_APP_API_URL

function BookmarkDetails() {
  const [bookmark, setBookmark] = useState([]);
  let { index } = useParams();
  let navigate = useNavigate()

  useEffect(() => {
    axios.get(API + `/bookmarks/${index}`)
    .then(bookmark => {
      setBookmark(bookmark.data)
    })
    .catch(() => {
      navigate("/not-found")
    })
  }, [index, navigate]);

  const handleDelete = () => {
    axios.delete(API +`/bookmarks/${index}`)
      .then(res => {
        navigate('/bookmarks')
      })
      .catch(err => console.error(err))
  };

  return (
    <article>
      <h3>
        {bookmark.isFavorite ? <span>⭐️</span> : null} {bookmark.name}
      </h3>
      <h5>
        <span>
          <a href={bookmark.url}>{bookmark.name}</a>
        </span>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {bookmark.url}
      </h5>
      <h6>{bookmark.category}</h6>
      <p>{bookmark.description}</p>
      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/bookmarks`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/bookmarks/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default BookmarkDetails;
