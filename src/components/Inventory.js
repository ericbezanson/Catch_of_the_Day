import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }
  authHandler = async authData => {
    // .1 look up current store in Firebase DB
    const store = await base.fetch(this.props.storeID, { context: this });
    console.log(store);
    // .2 claim it if there is no owner
    if (!store.owner) {
      await base.post(`${this.props.storeID}/owner`, {
        data: authData.user.uid
      });
    }
    // .3 set the state of the inventory component to reflect current user.
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
    console.log(authData);
  };
  authenticate = provider => {
    const authProvider = new firebase.auth.FacebookAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
    console.log("auth");
  };

  logout = async () => {
    console.log("logging out!");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };
  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;
    // 1. check if user logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // 2.check if they are the owner of the store
    if (this.state.uid !== this.state.owner) {
      <div>
        <p>Sorry you are not the Owner of this Store</p>
        {logout}
      </div>;
    }

    // 3. if they are owner, render inventory
    return (
      <div className="Inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
