import "./App.scss";
import ListGroup from "react-bootstrap/ListGroup";
import TrackListItem from "./components/TrackListItem";
import LoginBtn from "./components/LoginBtn";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";

import { searchForTracks, searchForArtist } from "./api/services/Search";

import { searchForPlaylists } from "./api/services/PlaylistSearch";

const App = () => {
  const [searchKey, setSearchKey] = useState("submarine");
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [selectedDropdown, setSelectedDropdown] = useState("Track");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const handleDropdownSelect = (e) => {
    setSelectedDropdown(e);
  };

  const extractSongs = (songs) => {
    // sort by popularity
    songs.sort((a, b) => b.popularity - a.popularity);
    setIsLoading(false);
    setTracks(songs);
  };

  const extractPlaylists = (playlists) => {
    // sort by popularity
    playlists.sort((a, b) => b.popularity - a.popularity);
    setIsLoading(false);
    setTracks(playlists);
  };

  const search = () => {
    setIsLoading(true);
    if (selectedDropdown === "Track") {
      searchForTracks(token, searchKey, extractSongs);
    } else if (selectedDropdown === "Artist") {
      searchForArtist(token, searchKey, extractSongs);
    } else {
      searchForPlaylists(token, searchKey, extractPlaylists);
    }
  };

  const listOfTracks = tracks.map((track, index) => (
    <TrackListItem key={index} item={track} token={token} />
  ));

  return (
    <div className="App">
      <div className="main-container text-center py-5 px-4">
        {!token ? <LoginBtn /> : ""}
        <h1 className="display-5 fw-bold">Music list generator</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Search by playlist/artist/track</p>
          <SearchBar
            onSearch={search}
            onInputEnter={setSearchKey}
            currentSelectedDropdown={selectedDropdown}
            onDropdownSelect={handleDropdownSelect}
          />
        </div>
      </div>
      <div className="generated-list">
        {!isLoading && <ListGroup as="ol">{listOfTracks}</ListGroup>}
        {isLoading && (
          <div className="loading-container d-flex justify-content-center">
            <div className="spinner-border" role="status"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
