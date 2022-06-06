import ListGroup from "react-bootstrap/ListGroup";

export default function TrackListItem(track) {
  return (
    <ListGroup.Item as="li">
      <a href={track.track.uri} className="track-link">
        {track.track.name} - {track.track.artists[0].name}
      </a>
    </ListGroup.Item>
  );
}
