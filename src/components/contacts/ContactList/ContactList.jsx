import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

let ContactList = () => {

    let [state, SetState] = useState({
        loading: false,
        contacts : [],
        errorMessage : ''
    });

useEffect( () => async function fetchData() {
    try {
        SetState( {...state, loading:true});
    let response = await ContactService.getAllContacts();
    SetState( 
        {...state,
        loading:false,
        contacts: response.data
    });
    } catch (error) {
        SetState({
            ...state,
            loading: false,
            errorMessage: error.message
        })
    }
}, []);

    //delete contact

    let clickDelete = async(contactId) => {
        try {
           let response = await ContactService.deleteContact(contactId);
           if (response){
            SetState( {...state, loading:true});
            let response = await ContactService.getAllContacts();
            SetState( 
                {...state,
                loading:false,
                contacts: response.data
            });
           }   
        } catch (error) {
            SetState({
                ...state,
                loading: false,
                errorMessage: error.message
            })
        }
    }

    let{loading, contacts, errorMessage} = state;

    return(
        <React.Fragment>
           <section className="contact-search p-3">
               <div className="container">
                  <div className="grid">
                    <div className="row">
                        <div className="col">
                        <p className="h3">
                            Gerenciador do Contatos
                            <Link to={"/contacts/add"} className="btn btn-primary ms-2">
                            <i className="fa fa-plus-circle me-2"></i> 
                                 Criar
                            </Link>
                        </p>
                        <p className="fst-italic">
                        Oi! Nesta App Você vai a poder salvar os contatos de você!
                        </p>
                        </div>
                    </div>
{/*                     <div className="row">
                        <div className="col-md-6">
                            <form className="row">
                                <div className="col">
                                    <div className="mb-2">
                                        <input type="text" className="form-control"
                                        placeholder=" Procure seu contato"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-2">
                                    <input type="submit" className="btn btn-outline-light"
                                    value="Procurar"
                                        placeholder=" Procure seu contato"/>
                                    </div>
                                </div>
        
                            </form>
                        </div>
                    </div> */}
                  </div>
               </div>
           </section>

            {
                loading ? <Spinner/> : 
                <React.Fragment>
                <section className="contact-list">
                <div className="container">
                    <div className="row">

                        {
                            contacts.length > 0 && 
                            contacts.map(contact => {
                                return(
                                    <div className="col-md-6" key={contact.id}>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row align-items-center d-flex justify-content-around">
                                            <div className="col-md-4">
                                                <img src={contact.foto} alt={contact.nome} className="contact-img" /> 
                                            </div>
                                            <div className="col-md-7">
                                                            <ul className="list-group align-items-center">
                                                                <li className="list-group-item list-group-item-action">
                                                                    Name: <span className="fw-bold">{contact.nome}</span>
                                                                </li>
                                                                <li className="list-group-item list-group-item-action">
                                                                    Mobile Number: <span className="fw-bold">{contact.telefone}</span>
                                                                </li>
                                                                <li className="list-group-item list-group-item-action">
                                                                    Email: <span className="fw-bold">{contact.email}</span>
                                                                </li>
                                                            </ul>
                                            </div>
                                            <div className="col-md-1 d-flex flex-column align-items-center">
{/*                                                 <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning my-1">
                                                    <i className="fa fa-eye"></i>
                                                </Link> */}
                                                <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-1">
                                                    <i className="fa fa-pencil"></i>
                                                </Link>
                                                <button className="btn  btn-danger my-1" onClick={() => clickDelete(contact.id)}>
                                                    <i className="fa fa-trash"> </i>
                                                </button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
    
                </React.Fragment>
            }

            
        </React.Fragment>
    )
 };

 export default ContactList;