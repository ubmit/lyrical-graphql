import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import query from "../queries/fetchSongs";

class SongCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
  }

  onSubmit(e) {
    e.preventDefault();

    this.props
      .mutate({
        variables: {
          title: this.state.title
        },
        refetchQueries: [{ query }]
      })
      .then(() => hashHistory.push("/"));
  }

  render() {
    const { title } = this.state;

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={e => this.onSubmit(e)}>
          <label>Song Title:</label>
          <input
            value={title}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
