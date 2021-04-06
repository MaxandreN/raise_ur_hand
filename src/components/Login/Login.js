import React from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import './Login.scss';

class Login extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
            mail: '',
            mdp: '',
            token: '',
            msgErreur: ''
        };
    
        this.handleChangeMail = this.handleChangeMail.bind(this);
        this.handleChangeMdp = this.handleChangeMdp.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
      handleChangeMail(event) {
        this.setState({mail: event.target.value});
      }

      handleChangeMdp(event) {
        this.setState({mdp:event.target.value});
      }
    
      handleSubmit(event) {
        this.getLogin(this.state.mail, this.state.mdp);
        event.preventDefault();
        this.setState({msgErreur : ''});
      }
      
      // setMail(){
      //   console.log('rfefe')
      //   if( localStorage.getItem('mail')){
      //    return localStorage.getItem('mail');
      //   }else{
      //     return '';
      //   }
      // }

      setLogin(token, mail){
        var decoded = jwt_decode(token);
        Object.keys(decoded).forEach(function (key) {
          let res = key.split("/");
          if (res.length > 1) {
            console.log(res[res.length-1]);
              if (res[res.length - 1] === 'role') {
                sessionStorage.setItem("role", decoded[key])
              }
              if (res[res.length - 1] === 'emailaddress' && decoded[key] == mail) {
                sessionStorage.setItem("mail", decoded[key])
                localStorage.setItem("mail", decoded[key])
              }
          }
        });
        sessionStorage.setItem("token", token);

      }

      getLogin (mail, mdp) {
        //requete api pour la connection
        const thisProps = this.props
        const thisS = this
        axios.post(
          "https://localhost:5001/api/utilisateur/login", 
          {}, 
          {headers:{ accept: 'application/text', mail: mail, mdp: mdp }})
          .then (response => {
            //si resultat positif on le stock en session
            // recupération des data du token (role et mail)
            const token = response.data
            var decoded = jwt_decode(token);
            Object.keys(decoded).forEach(function (key) {
              let res = key.split("/");
              if (res.length > 1) {
                  if (res[res.length - 1] === 'role') {
                    // mise en session du role 
                    sessionStorage.setItem("role", decoded[key])
                  }
                  if (res[res.length - 1] === 'emailaddress' && decoded[key] == mail) {
                    // mise en session du mdp
                    sessionStorage.setItem("mail", decoded[key])
                  }
                  if (res[res.length - 1] === 'nameidentifier') {
                    // mise en session du mdp
                    sessionStorage.setItem("identifier", decoded[key])
                  }
              }
            });
             // mise en session du token 
            sessionStorage.setItem("token", token);
            console.log('connexion reussi');
            thisProps.onLogin(true); 
          })
          .catch( err => {
            //sinon on affiche une erreur
            if(err.response.status == 404){
              console.error("Error " + err.response.status + " : " + err.response.data);
              thisS.setState({msgErreur : 'adresse mail ou mot de passe erroné'});
            }else{
              console.log(err);
              console.error("Error response:");
              console.error(err.response.status); 
            }
            
            thisProps.onLogin(false);
            
          })
        
      }
      
      render() {
        return (
        <div className="login">
          <div className="session">
          <div className="left">
            <img src="http://localhost:3000/RaiseUrHand.jpg" />
            {this.state.msgErreur === '' ? <p></p> : <p className='error'>{this.state.msgErreur}</p>}
          </div>
          <form className="log-in" onSubmit={this.handleSubmit}> 
            <img src="http://localhost:3000/UniLaSalle_couleur_text.png" />
            <div className="floating-label">
              <input placeholder="Email" type="email" name="email" className='input' value={this.state.mail} onChange={this.handleChangeMail} required/>
              <label htmlFor="email">Email:</label>
              <div className="icon">
              </div>
            </div>
            <div className="floating-label">
              <input placeholder="Mot de passe" type="password" name="password" value={this.state.mdp} onChange={this.handleChangeMdp} required/>
              <label htmlFor="password">Mot de passe:</label>
              <div className="icon">
              </div>
            </div>
            <button type="submit" >Login</button>
          </form>
          </div>
        </div>
        );
      }
}

export default Login