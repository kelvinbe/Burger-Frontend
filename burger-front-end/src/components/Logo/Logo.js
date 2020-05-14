import React from 'react';
import burgerLogo from '../../assets/images/logoo.png'
import './Logo.css'

const logo = (props) => (
    <div className={"Logo"} style={{height:props.height}}>
        <img src={burgerLogo} alt="burger"/>
    </div>
);

export default logo;