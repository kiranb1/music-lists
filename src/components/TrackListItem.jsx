import ListGroup from "react-bootstrap/ListGroup";

export default function TrackListItem(track) {
  let listElement = "";
  if (track.track.type === "playlist") {
    listElement = (
      <a href={track.track.uri} className="track-link">
        {track.track.name} {`${track.track.tracks.total} tracks`}
      </a>
    );
  } else {
    listElement = (
      <a href={track.track.uri} className="track-link">
        {track.track.name} - {track.track.artists[0].name}
      </a>
    );
  }

  return <ListGroup.Item as="li">{listElement}</ListGroup.Item>;
}
