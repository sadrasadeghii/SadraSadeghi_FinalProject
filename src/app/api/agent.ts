import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;
const responseBody = (response: AxiosResponse) => response.data;
axios.interceptors.response.use(async response => {
    await sleep()
    return response
}, (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
        case 404:
            // toast.error(data)
            break;
        case 500:
            // console.log(data)
            break;
    }
    // toast.error(error.response?.data)
    return Promise.reject(error.response?.data);
})
const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Product = {
    allProducts: () => requests.get('products'),
    customProduct: (id: number) => requests.get(`products/${id}`)
}
const basket = {
    allItems: () => requests.get('basket'),
    addItemToBasket: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItemFromBasket: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}
const agent = {
    Product,
    basket
}

export default agent;