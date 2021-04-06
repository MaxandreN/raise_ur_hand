import React from 'react';
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Classes from "./components/Classes/Classes";
import Classe from "./components/Classes/Classe";
import Home from "./components/Home/Home";
import Me from "./components/Me/Me";
import { ButtonPush } from './components/Button';
import {BrowserRouter  as Router, Route, Switch} from 'react-router-dom';

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
    if(sessionStorage.getItem('token') && sessionStorage.getItem('role') && sessionStorage.getItem('mail')){
      return true;
    }else{
      return false;
    }
  }

  handleLogin = (boolean) => {
    if(boolean == false){
      sessionStorage.clear();
      this.setState({login: boolean, role: ''});
    }else{
      this.setState({login: boolean, role: sessionStorage.getItem('role')});
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
              
              {(sessionStorage.getItem('role') === "intendant" || sessionStorage.getItem('role') === "administrateur") && (<Route path='/intendance' exact render={() => <div><h1>  en cours de dev... </h1><ButtonPush push='/'>retour a l'Accueil</ButtonPush></div>}/>)}

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
