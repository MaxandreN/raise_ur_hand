import { Link, useParams   } from 'react-router-dom'
import React from 'react'
import { Button, ButtonPush } from '../Button.js'
import { CardEtudiant } from '../Vue/table/table.js'
import axios from 'axios';
import './Classes.css';

class intendance extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
            participants: [],
        };
        
    } 
    

    componentDidMount() {
        //requete api pour la connection
        axios.get("https://localhost:5001/api/participant/byCours/"+this.props.props.match.params.id,
        {headers:{ 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }}
        )
        .then (response => {
            const participants = response.data;
            this.setState({ participants });
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

    // handlClick = (id, id_statut, index) => {
    //     id_statut ++
    //     if(id_statut > 3){
    //         id_statut = 1
    //     }
    //     axios.put("https://localhost:5001/api/participant/setSatut/"+id,
    //         {id_statut: id_statut},
    //         {headers:{ 
    //             'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    //         }
    //     })
    //     .then (response => {
    //         const newParticipant = response.data;
    //         const participants = this.state.participants;
    //         participants[index].id_statut = id_statut
    //         participants[index].statut_label = newParticipant.statut_label
    //         this.setState({participants : participants});

    //     })
    //     .catch(err =>{
    //         //sinon on affiche une erreur
    //          if(err.response.status == 404){
    //            console.error("Error " + err.response.status + " : " + err.response.data);
    //          }else if(err.response.status == 401){
    //             this.props.onLogOut(false);
    //             console.error("Error " + err.response.status + " : " + err.response.data);
    //           }else{
    //           console.error(err.response.status); 
    //         }
    //     })

    // }



    render() {
        return(
            <div>
                
                <div className="container">
                        <div className="titrePage">          
                            <p className="titre">Cours {this.props.props.match.params.label}</p>
                            <p className="temps"></p>
                        </div>
                </div>

                
             

                <div className="container">
                {this.state.participants.map((participant,index) =>
                    <CardEtudiant statut_label={participant.statut_label}
                    imageUrl={participant.url_photoUtilisateur}
                    nom={participant.utilisateur_nom}
                    prenom={participant.utilisateur_prenom}
                    id={participant.id}
                    onClick ={() => (this.handlClick(participant.id, participant.id_statut, index))}
                    key= {index}
                    ></CardEtudiant>
                )}
                </div>
            </div>
        )
    }
}

export default intendance;