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

export const searchForTracks = async (token, searchKey, extractSongs) => {
  const res = await search(
    {
      q: searchKey,
      type: "track",
      limit: 10,
    },
    "https://api.spotify.com/v1/search",
    token,
    extractSongs
  );

  extractSongs(res.data.tracks.items);
};

export const searchForPlaylists = async (
  token,
  searchKey,
  extractPlaylists
) => {
  const res = await search(
    {
      q: searchKey,
      type: "playlist",
      limit: 10,
    },
    "https://api.spotify.com/v1/search",
    token
  );

  extractPlaylists(res.data.playlists.items);
};

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
