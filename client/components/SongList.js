import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import query from "../queries/fetchSongs";
import gql from "graphql-tag";

const SongList = ({ data: { loading, error, songs, refetch }, mutate }) => {
  if (loading) return <div>loading...</div>;
  if (error) return <div>{`error: ${error.message}`}</div>;

  return (
    <div>
      <ul className="collection">
        {songs.map(({ id, title }) => (
          <li key={id} className="collection-item">
            <Link to={`/songs/${id}`}>{title}</Link>
            <i
              className="material-icons warning"
              onClick={() =>
                mutate({
                  variables: {
                    id
                  }
                }).then(() => refetch())
              }
            >
              delete
            </i>
          </li>
        ))}
      </ul>
      <Link to="/songs/new" className="btn-floating btn-large right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(query)(SongList));
