import axios from "axios";

export const unlikeTrack = async (trackId, token, updateTrackLikeState) => {
  await axios
    .delete("https://api.spotify.com/v1/me/tracks/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ids: trackId,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        updateTrackLikeState("unlike");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
