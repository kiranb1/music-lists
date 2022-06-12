import axios from "axios";

export const search = async (params, url, token) => {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    });

    return res;
  } catch (err) {
    console.log(err);
  }
};

// Search for tracks based on search term
export const searchForTracks = async (token, searchKey, extractSongs) => {
  const res = await search(
    {
      q: searchKey,
      type: "track",
      limit: 10,
    },
    "https://api.spotify.com/v1/search",
    token
  );

  const tracks = res.data.tracks.items;
  getTrackAndSet(tracks, token, extractSongs);
};

// Add isLiked key to track
const getTrackAndSet = async (tracks, token, extractSongs) => {
  const newTracks = [];
  for (const track of tracks) {
    track.isLiked = await checkForTrack(track.id, token);
    newTracks.push(track);
  }
  extractSongs(newTracks);
};

// Check if track already exists in User's liked songs
export const checkForTrack = async (trackId, token) => {
  try {
    const res = await axios.get(
      "https://api.spotify.com/v1/me/tracks/contains",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          ids: trackId,
        },
      }
    );
    return res.data[0];
  } catch (err) {
    console.log(err);
  }
};

// Search for artist and return their top 10 tracks
export const searchForArtist = async (token, searchKey, extractSongs) => {
  try {
    const res = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
        limit: 1,
      },
    });

    const artistId = res.data.artists.items[0].id;

    // use id to search for artist's top tracks
    const tracks = await search(
      {
        id: artistId,
        market: "GB",
      },
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
      token,
      extractSongs
    );
    extractSongs(tracks.data.tracks);
  } catch (err) {
    console.log(err);
  }
};
