import { Row, Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { FaHeart, FaPlayCircle } from "react-icons/fa";

export default function TrackListItem(item) {
  const track = item.track;
  const playlist = item.track.data;

  let listElement = "";

  if (playlist) {
    listElement = (
      <a href={playlist.uri} className="track-detail text-decoration-none">
        <Row>
          <Col>{item.track.data.name}</Col>
          <Col className="d-flex justify-content-sm-end col-12 col-sm-6">
            <div className="playlist-total-tracks me-4">{`${playlist.tracks.total} tracks`}</div>
            <span className="playlist-likes me-4 text-danger">
              <FaHeart className="heart-icon me-1" color="red" size={18} />
              {`${playlist.followers.total}`}
            </span>
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
