import "./App.scss";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import TrackListItem from "./components/TrackListItem";
import { FormControl } from "react-bootstrap";
import LoginBtn from "./components/LoginBtn";
import { useState, useEffect } from "react";

import { searchForTracks, searchForArtist } from "./api";

const App = () => {
  const [selectedDropdown, setSelectedDropdown] = useState("Track");
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [searchKey, setSearchKey] = useState("submarine");

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

  const search = (e) => {
    if (selectedDropdown === "Track") {
      searchForTracks(token, searchKey, extractSongs);
    } else if (selectedDropdown === "Artist") {
      searchForArtist(token, searchKey, extractSongs);
    } else {
      // TODO playlist search
      console.log("Playlist search");
    }
  };

  const extractSongs = (songs) => {
    // sort by popularity
    songs.sort((a, b) => b.popularity - a.popularity);
    setTracks(songs);
  };

  const listOfTracks = tracks.map((track, index) => (
    <TrackListItem key={track.external_ids.isrc} track={track} />
  ));

  return (
    <div className="App">
      <div className="main-container text-center py-5 px-4">
        {!token ? <LoginBtn /> : ""}
        <h1 className="display-5 fw-bold">Music list generator</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Enter a genre/artist/track to get the top 10 tracks for it
          </p>
          <div className="d-grid d-sm-flex justify-content-sm-center">
            <InputGroup className="mb-3">
              <DropdownButton
                onSelect={handleDropdownSelect}
                variant="secondary"
                title={selectedDropdown}
                id="input-group-dropdown-1"
              >
                <Dropdown.Item eventKey="Track">Track</Dropdown.Item>
                <Dropdown.Item eventKey="Playlist">Playlist</Dropdown.Item>
                <Dropdown.Item eventKey="Artist">Artist</Dropdown.Item>
              </DropdownButton>
              <FormControl
                placeholder="Search"
                aria-label="User search query"
                onChange={(e) => setSearchKey(e.target.value)}
                aria-describedby="generate-song-list-btn"
              />
              <Button
                onClick={search}
                variant="primary"
                id="generate-song-list-btn"
              >
                Generate
              </Button>
            </InputGroup>
          </div>
        </div>
      </div>
      <div className="generated-list">
        <ListGroup as="ol" numbered>
          {listOfTracks}
        </ListGroup>
      </div>
    </div>
  );
};

export default App;
