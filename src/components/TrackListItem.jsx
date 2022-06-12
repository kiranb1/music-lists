import { Row, Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { FaRegHeart, FaHeart, FaPlayCircle } from "react-icons/fa";

import { followPlaylist } from "../api/services/FollowPlaylist";
import { unfollowPlaylist } from "../api/services/UnfollowPlaylist";
import { likeTrack } from "../api/services/LikeTrack";
import { unlikeTrack } from "../api/services/UnlikeTrack";

import { useState, useEffect } from "react";

export default function TrackListItem({ item, token }) {
  const [itemFollowed, setIsFollowing] = useState();
  const [itemLiked, setIsItemLiked] = useState();
  const [playlistLikes, setPlaylistLikes] = useState();

  const track = item;
  const playlist = item.data;
  let listElement = "";

  useEffect(() => {
    if (playlist) {
      setIsFollowing(item.isFollowing.data[0]);
      setPlaylistLikes(playlist.followers.total);
    } else {
      setIsItemLiked(item.isLiked);
    }
  }, [item.isFollowing, item.isLiked, playlist]);

  const followOrLikePlaylist = (e) => {
    e.preventDefault();
    const isFollowedOrLiked = e.target.getAttribute("data-icon") === null;
    if (isFollowedOrLiked) {
      unfollowPlaylist(playlist.id, token, updatePlaylistLikes);
    } else {
      followPlaylist(playlist.id, token, updatePlaylistLikes);
    }
  };

  const likeCurrentTrack = (e) => {
    e.preventDefault();
    const isLiked = e.target.getAttribute("data-icon") === null;
    if (isLiked) {
      unlikeTrack(track.id, token, updateTrackLikeState);
    } else {
      likeTrack(track.id, token, updateTrackLikeState);
    }
  };

  const updatePlaylistLikes = (action) => {
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

  const updateTrackLikeState = (action) => {
    if (action === "like") {
      // update icon to fill
      setIsItemLiked(true);
    } else {
      // update icon to fill
      setIsItemLiked(false);
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
              className="playlist-likes me-4"
              onClick={(e) => followOrLikePlaylist(e)}
            >
              {/* Follow button */}
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
              <div
                className="me-4 track-likes"
                onClick={(e) => likeCurrentTrack(e)}
              >
                {/* Like button */}
                {itemLiked ? (
                  <FaHeart
                    data-icon="fill"
                    className="me-1 heart-icon"
                    size={20}
                  />
                ) : (
                  <FaRegHeart
                    data-icon="line"
                    className="me-1 heart-icon"
                    size={20}
                  />
                )}
              </div>
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
