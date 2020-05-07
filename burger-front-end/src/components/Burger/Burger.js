import React from 'react'
import './Burger.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients'


const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(igkey => {
        return [...Array(props.ingredients[igkey])].map((_, i) => {
            // eslint-disable-next-line no-unused-expressions
            return <BurgerIngredient key={igkey + i} type={igkey} />
        })
    })
    .reduce((prevArr, currentVal) => {
        return prevArr.concat(currentVal)
    }, [])

    console.log(transformedIngredients)

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding Ingredients</p>
    }
    return (
        <div className='Burger'>
            <BurgerIngredient type="bread-top"/>
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};


export default burger;