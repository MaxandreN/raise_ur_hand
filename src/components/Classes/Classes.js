import React from 'react'
import { Button, ButtonPush } from '../Button.js'
import { Card } from '../Vue/table/table.js'
import axios from 'axios';
import './Classes.css';
  

class Classes extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
            classes: [],
            coursProche : '',
            coursProcheString : ''
        };
    } 

    componentDidMount() {

        //requete api pour la connection
        axios.get("https://localhost:5001/api/cours/me/getCoursByParticipant",
        {headers:{ 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }}
        )
        .then (response => {
            const classes = response.data;
            this.setState({ classes });
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

    formatDate = (date) =>{
        let newDate = new Date(date);
        return (newDate.getHours() +":"+ newDate.getMinutes());
    }

    comparDate = (dateDebut, dateFin) =>{
        let newDateDebut = new Date(dateDebut);
        let newdateFin = new Date(dateFin);
        let newDate2 = new Date();
        if(newDateDebut < newDate2){
            if(newdateFin >= newDate2){
                return ("( en cours )");
            }
            return ("( fini )");
        }
        if(newDateDebut >= newDate2){
            let Hours = newDateDebut.getHours() - newDate2.getHours()
            let Minutes = newDateDebut.getMinutes() - newDate2.getMinutes()
            let H = 'h '
            if(Minutes < 0 ){
                Minutes += 60
                Hours -= 1 
            }
            if(Hours < 1){
                Hours = ''
                H = ''
            }
            if(this.state.coursProche > (Hours*60+Minutes) || this.state.coursProche == ''){
                this.setState({ coursProche : (Hours*60+Minutes), coursProcheString : "( Dans " + Hours + H +' '+ Minutes + " min )"})
            }

            return ("( Dans " + Hours + H +' '+ Minutes + " min )");
        }
        return ("ERREUR")
    }

    render() {
        return(
            <div>
                
                <div className="container">
                        <div className="titrePage">          
                            <p className="titre">Cours d'aujourd'hui</p>
                            <p className="temps">{this.state.coursProcheString}</p>
                        </div>
                </div>

                
             

                <div className="container">
                {this.state.classes.map((classe,index) =>

                    <Card label={classe.label} href={"/classe/"+classe.id+"/"+classe.label} debut={this.formatDate(classe.date_debut)} fin={this.formatDate(classe.date_fin)} salle={classe.batiment + classe.numero} compteur={this.comparDate(classe.date_debut, classe.date_fin)} key={index}/>

                )}
                </div>
            </div>
        )
    }
}

export default Classes;