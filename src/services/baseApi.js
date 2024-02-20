import axios from "axios";
import { useRouter } from "vue-router";

const baseApi = axios.create({
	baseURL: "http://127.0.0.1:8080/api"
})

	

const router = useRouter()

baseApi.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		// attach JWT to outgoing requests
		config.headers.Authorization = token;
	}
	return config;
},
	(error) => Promise.reject(error)
);

baseApi.interceptors.response.use(
	(response) => {
		// handle successful response
		return response
	},
	async (error) => {
		// handle error
		if (error.response.status === 401) {
			// handle 401 Unauthorized (token expired)
			localStorage.removeItem('token')
			localStorage.removeItem('user');
			location.reload()
			// router.push({ name: 'Login'})

		} else {
			// handle other errors... display error messages to the user
		}
		return Promise.reject(error)
	}
)
export default baseApi;
