import type { BaseProduct } from "$lib/types/app/product";
import axios from "axios";
import { URL } from '../../api';

export let getById: (id: string) => Promise<BaseProduct> = async (id: string) => {
    const response = await axios.get(`${URL}/products/${id}`)
    return response.data;
}

export let getByProperty: (property: string, value: any, qty: number) => Promise<Array<BaseProduct>> = async (property: string, value: any, qty: number) => {
    const response = await axios.get(`${URL}/products?property=${property}&value=${value}&qty=${qty}`);
    return response.data;
}