
import baseApi from "./baseApi.js";


export default {
	all(END_POINT) {
		return baseApi.get(END_POINT); // http://localhost:3000/api/users
	},
	getOne(END_POINT) {
		return baseApi.get(END_POINT); // http://localhost:3000/api/user/:id
	},
	store(END_POINT, data) {
		return baseApi.post(/*`${END_POINT}/register`*/ END_POINT, data);
	},
	update(END_POINT, data) {
		// http://localhost:3000/api/user/edit/:id
		return baseApi.put(/*`${END_POINT}/edit/${id}`*/ END_POINT, data);
	},
	delete(END_POINT) {
		return baseApi.delete(/*`${END_POINT}/delete/${id}`*/ END_POINT);
	},
};
