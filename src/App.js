import "./App.css";
import Post from "./Screens/Post";
import { useState, useEffect } from "react";
import { auth, db } from "./firebase.js";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, ButtonGroup, Input } from "@material-ui/core";
import ImageUpload from "./Screens/ImageUpload";
import InstagramEmbed from "react-instagram-embed";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const [posts, setPosts] = useState([]);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setSignIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            post: doc.data(),
            id: doc.id,
          }))
        );
      });
  }, []);
  const handleSignin = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => alert(err.message));
    setOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));
    setSignIn(false);
  };
  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                src="https://armgallery.it/wp-content/uploads/2020/04/instagram-scritta-png-1.png"
                className="app__headerimage"
              />
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleSignin}>Signup</Button>
          </form>
        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                src="https://armgallery.it/wp-content/uploads/2020/04/instagram-scritta-png-1.png"
                className="app__headerimage"
              />
            </center>
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Login</Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img
          src="https://armgallery.it/wp-content/uploads/2020/04/instagram-scritta-png-1.png"
          className="app__image"
        />
        {user == null ? (
          <div className="button__container">
            <Button onClick={() => setOpen(true)}>Signup</Button>
            <Button onClick={() => setSignIn(true)}>SignIn</Button>
          </div>
        ) : (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        )}
      </div>

      <div className="app__posts">
        <div className="app__postslef">
          {posts.map(({ post, id }) => {
            return (
              <Post
                key={id}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
              />
            );
          })}
        </div>
        <div className="app__postsright">
          
        </div>
      </div>
      <InstagramEmbed
  clientAccessToken='<appId>|<clientToken>'
  url='https://instagr.am/p/Zw9o4/'
  maxWidth={375}
  hideCaption={false}
  containerTagName='div'
  injectScript
  protocol=''
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/>
      {user?.displayName ? (
        <ImageUpload username={user.displayName}></ImageUpload>
      ) : (
        <h3>Sorry! You need to login first</h3>
      )}
    </div>
  );
}

export default App;
