import React from 'react'
import axios from 'axios';

class Me extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
            utilisateur: []
        };
    } 
    componentDidMount() {

        //requete api pour la connection
        axios.get("https://localhost:5001/api/utilisateur/me/get",
        {headers:{ 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }}
        )
        .then (response => {
            const utilisateur = response.data;
            this.setState({ utilisateur });
            console.log(response.data);
        })
        .catch(err =>{
            //sinon on affiche une erreur
             if(err.response.status == 404){
               console.error("Error " + err.response.status + " : " + err.response.data);
             }else if(err.response.status == 401){
                this.props.onLogOut(false);
                console.error("Error " + err.response.status + " : " + err.response.data);
              }else{
              console.error(err.response.status); 
            }
        })
        
    }
    render() {
        return(
            <h1>Mon compte : {this.state.utilisateur.nom} {this.state.utilisateur.prenom}</h1>

        )
    }
}

export default Me;