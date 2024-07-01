import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const [imageUrl, setImageUrl] = useState(null);

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    async function fetchInitialImage() {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/translate?api_key=WXpAvdBjzbmpAFOxxxViPoa1GIrsVGRD&s=cats`
        );

        const result = await response.json();
        console.log(result);

        setImageUrl(result.data.images.original.url);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchInitialImage();
  }, []);

  async function searchImage(e) {
    try {
      e.preventDefault();

      setIsSearching(true);
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=WXpAvdBjzbmpAFOxxxViPoa1GIrsVGRD&s=${searchTerm}`
      );

      const result = await response.json();
      console.log(result);

      setImageUrl(result.data.images.original.url);
      setIsSearching(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <main className="container">
      <h1 className="heading">GIF Search!</h1>

      <div className="gif-container">
        <p className=" gif-search-term">
          Search Result for : {searchTerm ? searchTerm : "Cats"}
        </p>
        <img className="gif-image" src={imageUrl} alt="" />
      </div>

      <form className="form-container" onSubmit={searchImage}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          type="text"
        />
        <button className="search-button">
          {isSearching ? "Searching..." : "Search"}
        </button>
      </form>
    </main>
  );
}
