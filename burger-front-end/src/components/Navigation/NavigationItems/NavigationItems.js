import React from 'react'
import './NavigationItems.css'
import NavigationItem  from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    // eslint-disable-next-line no-unused-expressions
    <div className={"NavigationItems"}>
    <ul className={"ul"}>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
    </div>
 

)

export default navigationItems