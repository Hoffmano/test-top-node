import axios from "axios";

const api = axios.create({
	baseURL: "https://teste.topnode.com.br",
});

export default api;