import axios from "axios";

//http://localhost:3000/
// this is the base url for our app

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST}`,
});

export default instance;
