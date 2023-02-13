import Axios from "axios";

function findAll() {
  return Axios.get("http://localhost:8000/api/invoices")
    .then(response => response.data["hydra:member"]);
}

function deleteInvoice(id) {
  return Axios.delete("http://localhost:8000/api/invoices/" + id);
}

function find(id) {
    return Axios.get("http://localhost:8000/api/invoices/" + id)
        .then(response => response.data);
    }

function update(id, invoice) {
    return Axios.put("http://localhost:8000/api/invoices/" + id, invoice);
}

export default {
    findAll : findAll,
    delete: deleteInvoice
};
    
