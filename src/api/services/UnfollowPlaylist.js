import axios from "axios";

export const unfollowPlaylist = async (
  playlistId,
  token,
  updatePlaylistLikes
) => {
  await axios
    .delete(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        updatePlaylistLikes("unfollow");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
