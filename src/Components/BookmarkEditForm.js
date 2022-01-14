import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios'
const API = process.env.REACT_APP_API_URL

function BookmarkEditForm() {
  let { index } = useParams();
  let navigate = useNavigate()

  const [bookmark, setBookmark] = useState({
    name: "",
    url: "",
    category: "",
    description: "",
    isFavorite: false,
  });

  const handleTextChange = (event) => {
    setBookmark({ ...bookmark, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setBookmark({ ...bookmark, isFavorite: !bookmark.isFavorite });
  };

  // const updateBookmark = () => {
  //   axios
  //     .put(`${API}/bookmarks/${index}`, bookmark)
  //     .then((response) => {
  //       setBookmark(response.data);
  //       navigate(`/bookmarks/${index}`);
  //     })
  //     .catch((c) => console.warn("catch", c));
  // };

  useEffect(() => {
    axios.get(API + `/bookmarks/${index}`)
    .then(res => {
      setBookmark(res.data)
    })
  }, [index]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(API + `/bookmarks/${index}`, bookmark)
      .then(res => {
        setBookmark(res.data)
        navigate(`/bookmarks/${index}`)
      })
      .catch((c) => console.warn("catch", c))
  };

  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={bookmark.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Website"
          required
        />
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          type="text"
          pattern="http[s]*://.+"
          required
          value={bookmark.url}
          placeholder="http://"
          onChange={handleTextChange}
        />
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          name="category"
          value={bookmark.category}
          placeholder="educational, inspirational, ..."
          onChange={handleTextChange}
        />
        <label htmlFor="isFavorite">Favorite:</label>
        <input
          id="isFavorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={bookmark.isFavorite}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={bookmark.description}
          onChange={handleTextChange}
          placeholder="Describe why you bookmarked this site"
        />
        <br />

        <input type="submit" />
      </form>
      <Link to={`/bookmarks/${index}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default BookmarkEditForm;
