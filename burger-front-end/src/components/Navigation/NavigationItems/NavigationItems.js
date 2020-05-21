import React from 'react'
import './NavigationItems.css'
import NavigationItem  from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    // eslint-disable-next-line no-unused-expressions
    <div className={"NavigationItems"}>
    <ul className={"ul"}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
    </div>
 

)

export default navigationItems