import React, { Component } from 'react';
import { Button } from '../Button';
import { MenuItems } from './MenuItems';
import { NavLink } from 'react-router-dom';
import'./Navbar.css'


class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked : false
        };
    }

    handleClick = (onClick) => {
        if(onClick == 'LogOut'){
            this.handleLogOut()
        }else{
            this.setState({ clicked: !this.state.clicked })
        }
        
    }

    handleLogOut = () => {
        this.props.onLogOut(false);
    }


    render() {
        return(
            <nav className='NavbarItems'>
                <img className='navbar-logo' src="http://localhost:3000/UniLaSalle_couleur_text.png" />
                
                <div className='menu' onClick={this.handleClick}>
                    <div className={this.state.clicked ? 'menu-icon off' : 'menu-icon'}>
                        <div></div>
                    </div>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        if(item.role.includes(window.role)){
                            return(
                                <NavLink exact activeClassName='current' className={item.cName} to={item.url} style={{textDecoration: 'none'}} key={index} onClick={ () => {this.handleClick(item.onclick)}}>
                                    <li >
                                        {item.title}
                                    </li>
                                </NavLink>
                            )
                        }
                    })}
                </ul>
                <Button className='logout' onClick={ this.handleLogOut } >Déconnexion</Button>
            </nav>
        )
    }
}

export default Navbar