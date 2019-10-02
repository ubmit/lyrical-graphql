import React from "react";
import { graphql } from "react-apollo";
import fetchSong from "../queries/fetchSong";
import { Link } from "react-router";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

const SongDetail = ({ data: { loading, error, song }, params }) => {
  if (loading) return <div>loading...</div>;
  if (error) return <div>error: {error.message}</div>;

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>{song.title}</h3>
      <LyricList lyrics={song.lyrics} />
      <LyricCreate songId={params.id} />
    </div>
  );
};

export default graphql(fetchSong, {
  options: props => ({ variables: { id: props.params.id } })
})(SongDetail);
