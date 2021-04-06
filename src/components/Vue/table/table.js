import React from 'react'
import './table.scss'




export const Card = ({
    label,
    href,
    debut,
    fin,
    salle,
    compteur

}) => {

    return (
        <article className="card">
            <a href={href}>
                <div className="containerTitre">          
                    <p className="titre">{label}</p>
                    <p className="temps">{compteur}</p>
                </div>
    
                <div className='bodyCard'>
                    <p><span>Debut:</span> {debut}</p>
                    <p><span>Fin:</span> {fin}</p>
                    <p><span>Salle:</span> {salle}</p>
                </div>
            </a>
        </article>
    )
}




export const CardEtudiant = ({
    statut_label,
    imageUrl,
    nom,
    prenom,
    onClick
    
}) => {

    return (
        <article className={ "cardEtudiant " +statut_label} onClick={onClick}>
                <div className='imageCard'>

                </div>
                <div className='bodyCard'>
                    <p><span>prénom:</span> {prenom}</p>
                    <p><span>nom:</span> {nom}</p>
                    <p className="statutCard">{statut_label}</p>
                    <p className="nextStatutCard">Modifier le statut</p>
                </div>
        </article>
    )
}