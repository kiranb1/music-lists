import axios from "axios";

export const likeTrack = async (trackId, token, updateTrackLikeState) => {
  await axios
    .put(
      "https://api.spotify.com/v1/me/tracks",
      {
        body: {
          public: false,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          ids: trackId,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        updateTrackLikeState("like");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
