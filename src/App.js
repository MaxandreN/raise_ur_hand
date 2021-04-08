import React from 'react';
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Classes from "./components/Classes/Classes";
import Classe from "./components/Classes/Classe";
import Home from "./components/Home/Home";
import Me from "./components/Me/Me";
import { ButtonPush } from './components/Button';
import {BrowserRouter  as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: this.testLogin(),
      role: ''
    };
  }

  testLogin(){
    if(sessionStorage.getItem('token')){
      this.setLogin(sessionStorage.getItem('token'))
      return true;
    }else{
      return false;
    }
    ;
  }

  setLogin(token){
    var decoded = jwt_decode(token);
    Object.keys(decoded).forEach(function (key) {
      let res = key.split("/");
      if (res.length > 1) {
        console.log(res[res.length-1]);
          if (res[res.length - 1] === 'role') {
            window.role = decoded[key]
          }
          if (res[res.length - 1] === 'emailaddress') {
            window.mail = decoded[key]  
          }
          if (res[res.length - 1] === 'nameidentifier') {
            // mise en session du mdp
            window.id = decoded[key]
          }
      }
    });
  }

  handleLogin = (boolean) => {
    if(boolean == false){
      sessionStorage.clear();
      window.role = undefined;
      window.id = undefined;
      window.mail = undefined;
      this.setState({login: boolean, role: ''});
    }else{
      this.setState({login: boolean, role: window.role });
    }
    
  }

  render() {
    return (
      <div className="App">
        { this.state.login ? (
          <Router>
            <Navbar onLogOut={this.handleLogin}/>
            <Switch>
              <Route path='/home' exact>
                <Home/>
              </Route>
              <Route path='/me' exact component={() => <Me onLogOut={this.handleLogin}></Me>}/>

              <Route path='/classes' exact component={() => <Classes onLogOut={this.handleLogin}></Classes>}/>
              <Route path='/classe/:id/:label' exact render={(props) => <Classe onLogOut={this.handleLogin} props={props} ></Classe>}/>
              
              {(window.role === "intendant" || window.role  === "administrateur") && (<Route path='/intendance' exact render={() => <div><h1>  en cours de dev... </h1><ButtonPush push='/'>retour a l'Accueil</ButtonPush></div>}/>)}

              <Route path='/'exact component={() => <Home/>} />
              <Route path='/' component={() => <div><h1>ERREUR 404</h1><ButtonPush push='/'>retour a l'Accueil</ButtonPush></div>} />
            </Switch>
          </Router>
        ) : (
          <Login onLogin={this.handleLogin}/>
        )}
        
      </div>
    );
  }
}

export default App;
