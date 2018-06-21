import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };
  componentDidMount() {
    const params = this.props.match.params;
    // first reinstate local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. add new fish to fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. set the new fishes object to state
    this.setState({
      fishes: fishes
    });
  };

  updateFish = (key, updateFish) => {
    // 1.take copy of current fish
    const fishes = { ...this.state.fishes };
    // 2.update that state
    fishes[key] = updateFish;
    // 3. set to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // 1. take copy of state
    const fishes = { ...this.state.fishes };
    // 2. update state
    fishes[key] = null;
    // 3. update state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // 1. take a copy of state
    const order = this.state.order;
    // 2. either add to order, or update number in order
    order[key] = order[key] + 1 || 1;
    // 3. call set state to update state object
    this.setState({ order });
  };

  deleteOrderItem = key => {
    // 1. take a copy of state
    const order = this.state.order;
    // 2. remove order item
    delete order[key];
    // 3. call set state to update state object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div>
          <Header tagline="Nat Pagle's Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          deleteOrderItem={this.deleteOrderItem}
        />
        <Inventory
          addFish={this.addFish}
          deleteFish={this.deleteFish}
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeID={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
