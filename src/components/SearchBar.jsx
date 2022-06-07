import {
  Button,
  InputGroup,
  Dropdown,
  DropdownButton,
  FormControl,
} from "react-bootstrap";

export default function SearchBar(props) {
  const { onSearch, onInputEnter, currentSelectedDropdown, onDropdownSelect } =
    props;

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="d-grid d-sm-flex justify-content-sm-center">
      <InputGroup className="mb-3">
        <DropdownButton
          onSelect={onDropdownSelect}
          variant="secondary"
          title={currentSelectedDropdown}
          id="input-group-dropdown-1"
        >
          <Dropdown.Item eventKey="Track">Track</Dropdown.Item>
          <Dropdown.Item eventKey="Playlist">Playlist</Dropdown.Item>
          <Dropdown.Item eventKey="Artist">Artist</Dropdown.Item>
        </DropdownButton>
        <FormControl
          onKeyPress={handleKeyPress}
          placeholder="Search"
          aria-label="User search query"
          onChange={(e) => onInputEnter(e.target.value)}
          aria-describedby="generate-song-list'-btn"
        />
        <Button
          type="submit"
          onClick={onSearch}
          variant="primary"
          id="generate-song-list-btn"
        >
          Generate
        </Button>
      </InputGroup>
    </div>
  );
}
