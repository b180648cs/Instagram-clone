import React, { useState } from "react";
import { db, storage } from "../firebase";
import { Button, ButtonGroup, Input } from "@material-ui/core";
import firebase from "firebase";
import "../style/ImageUpload.css";

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts")
              .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: url,
                username: username,
              })
              .then(() => {
                setProgress(0);
                setCaption("");
                setImage(null);
              });
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      <progress
        value={progress}
        className="image__progressbar"
        max="100"
      ></progress>
      <input
        type="text"
        placeholder="Enter the caption"
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
