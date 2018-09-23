import React from "react";
import axios from "axios";
import firebase from "firebase";

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
  }

  handleUploadImage = async ev => {
    ev.preventDefault();

    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);

    const idToken = await firebase.auth().currentUser?.getIdToken();
    await axios.post("/api/placeholder-token/upload", data, {
      headers: {
        Authorization: `Bearer: ${idToken}`,
      },
    });
  };

  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
        <input
          ref={ref => {
            this.uploadInput = ref;
          }}
          type="file"
        />

        <button>Upload</button>
      </form>
    );
  }
}
