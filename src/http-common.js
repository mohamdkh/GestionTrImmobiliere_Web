import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8090/",
  headers: {
    "Content-type": "application/json"
  }
});
// GestionDesTransactionsImmobilieres-0.0.1-SNAPSHOT