import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object
  };
  myInput = React.createRef();

  goToStore = event => {
    // stop form from refreshing page
    event.preventDefault();

    // get text from the input
    const storeName = this.myInput.value.value;

    // change the page to /store/data
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <React.Fragment>
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Please Enter a Store</h2>
          <input
            type="text"
            required
            placeholder="Store Name"
            ref={this.myInput}
            defaultValue={getFunName()}
          />
          <button onClick={this.handleClick} type="submit">
            {" "}
            Visit Store ->{" "}
          </button>
          <p>Refresh to Re-Brand Your Store!</p>
        </form>
      </React.Fragment>
    );
  }
}

export default StorePicker;
