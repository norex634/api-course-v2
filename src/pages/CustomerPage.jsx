import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Field from "../components/forms/Field";
import customersAPI from "../services/customersAPI";

const CustomerPage = (props) => {

    const {id = "new"} = useParams()
    const navigate = useNavigate()
    
    const [editing, setEditing] = useState(false)
    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })

    const fetchCustomers = async (id) => {
        try{
            const {firstName, lastName, email, company} = await customersAPI.find(id)
            setCustomer({firstName, lastName, email, company});
        }catch(error)
        {
            // notif à faire 
            console.log(error.response)
            navigate("/customers", {replace: true})
        }
    }

    // chargement du customer si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(()=>{
        if(id !== "new")
        {
            setEditing(true)
            fetchCustomers(id)
        }
    },[id])


    // gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget
        setCustomer({...customer, [name]: value})
    }


    // gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            // si on est en mode édition
            if(editing)
            {
                // on va mettre à jour le customer
                await customersAPI.update(id, customer)
            }
            // sinon on est en mode création
            else
            {
                await customersAPI.create(customer)
                // on redirige l'utilisateur vers la page des clients
                navigate("/customers", {replace: true})
            }
        }catch({response})
        {
            //console.log(response)
            // notif à faire
            const {violations} = response.data
            if(violations)
            {
                // on va créer un objet avec les clés qui sont les noms des propriétés et les valeurs qui sont les messages d'erreurs
                const apiErrors = {}
                // on va parcourir le tableau violations et pour chaque violation on va créer une clé avec le nom de la propriété et on va mettre la valeur du message d'erreur
                violations.forEach(({propertyPath, message}) => {
                    // on va créer une clé avec le nom de la propriété et on va mettre la valeur du message d'erreur
                    apiErrors[propertyPath] = message
                })
                // on va mettre à jour le state errors avec les erreurs de l'api
                setErrors(apiErrors)
            }
        }
    }



    return (
        <>
            {editing && <h1>Modification du client</h1> || <h1>Création d'un client</h1>}
            <form onSubmit={handleSubmit}>
                <Field
                    name="lastName"
                    label="Nom de famille"
                    placeholder="Nom de famille du client"
                    value={customer.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />
                <Field
                    name="firstName"
                    label="Prénom"
                    placeholder="Prénom du client"
                    value={customer.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                />
                <Field
                    name="email"
                    label="Email"
                    placeholder="Email du client"
                    type="email"
                    value={customer.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Field
                    name="company"
                    label="Entreprise"
                    placeholder="Entreprise du client"
                    value={customer.company}
                    onChange={handleChange}
                    error={errors.company}
                />
                <div className="my-3">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/customers" className="btn btn-secondary">Retour aux clients</Link>
                </div>
                
            </form>        
                
        </>
    );
};

export default CustomerPage;