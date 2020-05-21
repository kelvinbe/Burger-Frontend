import React, { Component } from "react"
import { render } from "@testing-library/react"
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import './ContactData.css'
import axios from '../../../axios-orders'


class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            city: '',
            postalCode: ''
        },
        loading: false
    }


    orderHandler = (event) => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      user: {
        name: 'Julias',
        email: 'test@gmail.com'
      }

    }
    axios.post('/orders.json', order)
    .then(response => {
    this.setState({loading: false})
    this.props.history.push('/')
    }
    )
    .catch(error => this.setState({loading: false}))
    

        event.preventDefault();
        console.log(this.props.ingredients)

    }




    render() {
        let form = (<form>
            <input className="Input" type="text" name="name" placeholder="Your Name" />
            <input className="Input" type="email" name="email" placeholder="Your Email" />
            <input className="Input" type="text" name="city" placeholder="Your City" />
            <input className="Input" type="text" name="postalCode" placeholder="Your Postal Code" />
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner />
        }
        return (

            <div className="ContactData">
                <h4>Enter your Contact data</h4>
                {form}
            </div>

        )
    }

}

export default ContactData