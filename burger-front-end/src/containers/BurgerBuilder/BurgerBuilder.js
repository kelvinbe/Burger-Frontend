import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
  salad: 10,
  bacon: 20,
  cheese: 30,
  meat: 70,
};

class BurgerBuilder extends Component {
  state = {
    
    ingredients: null,
    totalPrice: 10,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };


  componentDidMount () {
    axios.get('https://burger-back-app.firebaseio.com/ingredients.json')
          .then(response => {
            this.setState({ingredients: response.data})
          })
          .catch(error => {
            this.setState({error: true})
          })
  }

  updatePurchaseHandler(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredient = {
      ...this.state.ingredients,
    };
    updatedIngredient[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredient,
    });
    this.updatePurchaseHandler(updatedIngredient);
  };

  removeIngredientHandler = (type) => {
    // eslint-disable-next-line no-undef
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredient = {
      ...this.state.ingredients,
    };
    updatedIngredient[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredient,
    });
    this.updatePurchaseHandler(updatedIngredient);
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };


  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      name: this.state.name,
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      user: {
        name: 'Julias',
        email: 'test@gmail.com'
      }


    }
    axios.post('/orders.json', order)
    .then(response => this.setState({loading: false, purchasing: false}))
    .catch(error => this.setState({loading: false, purchasing: false}))
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

    if(this.state.ingredients){
      burger = ( <Aux> <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          purchasing={this.purchaseHandler}
          purchasable={this.state.purchasable}
          disabled={disabledInfo}
          price={this.state.totalPrice}
        />
        </Aux>
        );
        orderSummary =  <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        price={this.state.totalPrice}/>

    }      
    if (this.state.loading){
      orderSummary = <Spinner />
    }      
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
