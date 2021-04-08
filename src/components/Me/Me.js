import React from 'react'
import axios from 'axios';
import './Me.scss'

class Me extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
            utilisateur: [],
            mail: '',
            mdp: '',
            newMdp: '',
            file:'',
            fileURL:''
        };
    } 
    componentDidMount() {
        console.log(window.role);
        //requete api pour recupérer les données utilisateur
        axios.get("https://localhost:5001/api/utilisateur/me/get",
        {headers:{ 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }}
        )
        .then (response => {
            const utilisateur = response.data;
            this.setState({ utilisateur: utilisateur, mail: utilisateur.mail });
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

    handleChangeMail = (event) => {
        this.setState({mail: event.target.value});
      }

    handleChangeMdp = (event) => {
       this.setState({mdp: event.target.value});
     }

     handleChangeNewMdp = (event) => {
        this.setState({newMdp: event.target.value});
      }

    handleChangeFile = (event) => {
          if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
              this.setState({
                fileURL: URL.createObjectURL(event.target.files[0]),
                file: e.target.result
                })
            };
            reader.readAsDataURL(event.target.files[0]);
          }
    }

    handleSubmitMDP = (event) => {
        event.preventDefault();
        axios.put("https://localhost:5001/api/utilisateur/me/set/MDP",
        {},
        {headers:{'Authorization': `Bearer ${sessionStorage.getItem('token')}`, 'mdp': this.state.mdp, 'mdpNew': this.state.newMdp  }})
        .then (response => {
            console.log(response);
            this.setState({ mdp: '', newMdp: '' })
        })
        .catch(err =>{
            //sinon on affiche une erreur
             if(err.response.status == 404){
               console.error("Error " + err.response.status + " : " + err.response.data);
             }else if(err.response.status == 401){
                console.error("Error " + err.response.status + " : " + err.response.data);
              }else{
                console.error(err.response); 
            }
        })
    }

    handleSubmitImage = (event) => {

        event.preventDefault();
        axios.put("https://localhost:5001/api/utilisateur/me/set/image",
        {},
        {headers:
            {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`, 
                "url_photo": this.state.file
            }
        })
        .catch(err =>{
            //sinon on affiche une erreur
             if(err.response.status == 404){
               console.error("Error " + err.response.status + " : " + err.response.data);
             }else if(err.response.status == 401){
                console.error("Error " + err.response.status + " : " + err.response.data);
              }else{
              console.error(err.response.status); 
            }
        })
    }

    handleSubmitMail = (event) => {

        event.preventDefault();
        axios.put("https://localhost:5001/api/utilisateur/me/set/image",
        {},
        {headers:
            {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`, 
                "url_photo": (this.state.file.replace("data:", "")).split("/")
            }
        })
        .catch(err =>{
            //sinon on affiche une erreur
             if(err.response.status == 404){
               console.error("Error " + err.response.status + " : " + err.response.data);
             }else if(err.response.status == 401){
                console.error("Error " + err.response.status + " : " + err.response.data);
              }else{
              console.error(err.response.status); 
            }
        })
    }

    render() {
        return(
            <div>
                <form className="account article" onSubmit={this.handleSubmitMail} > 
                    <h1>Mon compte :</h1>
                    {this.state.utilisateur.url_photo && <img src={this.state.utilisateur.url_photo}/>}
                    <div className="floating-label">
                        <label htmlFor="email">Email:</label>
                        <input placeholder={this.state.utilisateur.mail} type="email" className='input' value={this.state.mail} onChange={this.handleChangeMail} required/>
                    </div>
                    <div className="floating-label">
                        <label htmlFor="text">Prénom:</label>
                        <p>{this.state.utilisateur.prenom}</p>
                    </div>
                    <div className="floating-label">
                        <label htmlFor="text">Nom:</label>
                        <p>{this.state.utilisateur.nom}</p>
                    </div>
                    <div className="floating-label">
                        <label htmlFor="text">Login:</label>
                        <p>{this.state.utilisateur.login}</p>
                    </div>
                    <button type="submit" >Modifier les informations </button>
                </form>

                <form className="mdp article" onSubmit={this.handleSubmitImage} >
                    <div className="floating-label">
                        <label htmlFor="image">Image :</label>
                        <input placeholder={this.state.utilisateur.mail} type="file" className='image' onChange={this.handleChangeFile} required/>
                        <img src={this.state.fileURL}/>
                        <button type="submit" >confirmer la modification de la photo de profile</button>
                    </div>
                </form>

                <form className="mdp article" onSubmit={this.handleSubmitMDP} >
                    <div className="floating-label">
                        <label htmlFor="password">Mot de passe actuel :</label>
                        <input placeholder="Mot de passe" type="password" value={this.state.mdp} onChange={this.handleChangeMdp} required/>
                    </div>
                    <div className="floating-label">
                        <label htmlFor="newPassword">Nouveau mot de passe:</label>
                        <input placeholder="Mot de passe" type="password" value={this.state.newMdp} onChange={this.handleChangeNewMdp} required/>
                    </div>
                    <button type="submit">Modifer mot de passe</button>
                </form>
            </div>

        )
    }
}

export default Me;