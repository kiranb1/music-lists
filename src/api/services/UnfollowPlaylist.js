import axios from "axios";

export const unfollowPlaylist = async (playlistId, token, updateLikes) => {
  await axios
    .delete(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        updateLikes("unfollow");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
