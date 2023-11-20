import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import Cookies from "js-cookie";
import snakecaseKeys from "snakecase-keys";

const Api = {
    init() {
        axios.defaults.baseURL = "http://192.168.100.56:8000/api";
        axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
        axios.defaults.headers.common.Authorization =
            "Bearer " + Cookies.get("token");
    },
    setAccessControl() {
        axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
        axios.defaults.headers.common["Cache-Control"] = "no-cache, private";
    },
    setHeaderMultipartFormData() {
        axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
    },
    get(resource, params) {
        return axios.get(`${resource}`, {   
            params: params,
            transformResponse: [
                (data) => {
                    return camelcaseKeys(JSON.parse(data), { deep: true });
                },
            ],
        });
    },
    post(resource, params) {
        return axios.post(
            `${resource}`,
            snakecaseKeys(params, { deep: true }),
            {
                transformResponse: [
                    (data) => {
                        if (data) {
                            return camelcaseKeys(JSON.parse(data), {
                                deep: true,
                            });
                        }
                    },
                ],
            }
        );
    },
    postFormData(resource, params) {
        return axios.post(`${resource}`, params, {
            transformResponse: [
                (data) => {
                    if (data) {
                        return camelcaseKeys(JSON.parse(data), { deep: true });
                    }
                },
            ],
        });
    },
    delete(resource) {
        return axios.delete(resource);
    },
    update(resource, slug, params) {
        return axios.put(       
            `${resource}/${slug}`,
            snakecaseKeys(params, { deep: true })
        );
    },
    updateFormData(resource, params) {
        console.log(resource, params);
        return axios.put(`${resource}`, params, {
            transformResponse: [
                (data) => {
                    if (data) {
                        return camelcaseKeys(JSON.parse(data), { deep: true });
                    }
                },
            ],
        });
    },

    put(resource, params) {
        return axios.put(`${resource}`, snakecaseKeys(params, { deep: true }));
    },
    getFile(resource, params) {
        return axios.get(`${resource}`, {
            responseType: "blob",
            params: params,
        });
    },
};

export default Api;