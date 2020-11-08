import axios from "axios";

const PORT = "http://localhost:4000/";

export default {
  user: {
    signUp: formBody => {
      axios.post(PORT + "sign-up", formBody);
    },
    login: formBody => {
      axios.post(PORT + "login", formBody);
    }
  }
};