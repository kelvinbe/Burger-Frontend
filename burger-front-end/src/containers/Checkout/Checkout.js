import React, { Component } from "react";
import ChekoutSummary from "../../components/Order/Checkoutsummary/Checkoutsummary";

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }
  render() {
   return (
      <div>
        <ChekoutSummary ingredients = {this.state.ingredients}/>
      </div>
    );
  }
}

export default Checkout;
