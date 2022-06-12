import axios from "axios";

export const followPlaylist = async (
  playlistId,
  token,
  updatePlaylistLikes
) => {
  await axios
    .put(
      `https://api.spotify.com/v1/playlists/${playlistId}/followers`,
      {
        body: {
          public: false,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        updatePlaylistLikes("follow");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
