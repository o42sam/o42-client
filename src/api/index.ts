import { API_URL } from "$lib/consts";

export const URL = API_URL;

export * from "./auth"

export { getById as getProductById, getByProperty as getProductsByProperty } from "./product";

export { 
    getById as getCustomerById, 
    create as createCustomer, 
    updateById as updateCustomerById, 
    deleteById as deleteCustomerById 
} from "./customer";

export { 
    getById as getAgentById, 
    create as createAgent, 
    updateById as updateAgentById, 
    deleteById as deleteAgentById 
} from "./agent";