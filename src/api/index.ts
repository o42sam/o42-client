export const API_URL = 'http://localhost:3000';

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