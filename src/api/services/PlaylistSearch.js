import axios from "axios";

export const searchForPlaylists = async (
  token,
  searchKey,
  extractPlaylists
) => {
  await axios
    .get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "playlist",
        limit: 10,
      },
    })
    .then((playlists) => {
      getPlaylistsAndSet(
        playlists.data.playlists.items,
        token,
        extractPlaylists
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

const getPlaylistsAndSet = async (playlists, token, extractPlaylists) => {
  const newPlaylists = [];
  for (const playlist of playlists) {
    const newPlaylist = await getPlaylist(token, playlist.id);
    newPlaylist.isFollowing = await checkPlaylistFollowed(playlist.id, token);
    newPlaylists.push(newPlaylist);
  }
  extractPlaylists(newPlaylists);
};

const checkPlaylistFollowed = async (playlistId, token) => {
  try {
    const res = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/followers/contains`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          ids: `${process.env.REACT_APP_USERNAME}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getPlaylist = async (token, playlistId) => {
  try {
    const res = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};
