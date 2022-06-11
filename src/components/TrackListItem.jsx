import { Row, Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import {
  FaRegHeart,
  FaHeart,
  FaPlayCircle,
  FaLaptopHouse,
} from "react-icons/fa";

import { followPlaylist } from "../api/services/FollowPlaylist";
import { unfollowPlaylist } from "../api/services/UnfollowPlaylist";

import { useState, useEffect } from "react";

export default function TrackListItem({ item, token }) {
  const [itemFollowed, setIsFollowing] = useState();
  const [playlistLikes, setPlaylistLikes] = useState();

  const track = item;
  const playlist = item.data;
  let listElement = "";

  useEffect(() => {
    setIsFollowing(item.isFollowing.data[0]);
    setPlaylistLikes(playlist.followers.total);
  }, [item, playlist]);

  const followOrLikeMe = (e) => {
    e.preventDefault();
    const isFollowedOrLiked = e.target.getAttribute("data-icon") === null;
    if (isFollowedOrLiked) {
      unfollowPlaylist(playlist.id, token, updateLikes);
    } else {
      followPlaylist(playlist.id, token, updateLikes);
    }
  };

  const updateLikes = (action) => {
    if (action === "follow") {
      // update icon to fill
      setIsFollowing(true);
      // incremement likes total
      setPlaylistLikes(playlistLikes + 1);
    } else {
      // update icon to fill
      setIsFollowing(false);
      // incremement likes total
      setPlaylistLikes(playlistLikes - 1);
    }
  };

  if (playlist) {
    listElement = (
      <a href={playlist.uri} className="track-detail text-decoration-none">
        <Row>
          <Col>{playlist.name}</Col>
          <Col className="d-flex justify-content-sm-end col-12 col-sm-6">
            <div className="playlist-total-tracks me-4">{`${playlist.tracks.total} tracks`}</div>
            <div
              className="playlist-likes me-4 text-danger"
              onClick={followOrLikeMe}
            >
              {/* Like/follow button */}
              {itemFollowed ? (
                <FaHeart
                  data-icon="fill"
                  className="me-1 heart-icon"
                  size={15}
                />
              ) : (
                <FaRegHeart
                  data-icon="line"
                  className="me-1 heart-icon"
                  size={15}
                />
              )}
              {`${playlistLikes}`}
            </div>
            <FaPlayCircle className="play-btn" size="1.5em" />
          </Col>
        </Row>
      </a>
    );
  } else {
    listElement = (
      <>
        <a href={track.uri} className="track-detail text-decoration-none">
          <Row>
            <Col>
              {track.name} -{" "}
              <span className="artist-name">{track.artists[0].name}</span>
            </Col>
            <Col className="d-flex justify-content-end col-12 col-sm-6">
              <FaPlayCircle className="play-btn" size="1.5em" />
            </Col>
          </Row>
        </a>
      </>
    );
  }

  return (
    <ListGroup.Item className="track-detail" as="li">
      {listElement}
    </ListGroup.Item>
  );
}
