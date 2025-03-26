import axios from "axios";

export const getEntitiesByProperty = async (entity: string, property: string, value: string, qty: number): Promise<Array<any>> => {
    const response = await axios.get(`${URL}/agents?entity=${entity}&property=${property}&value=${value}&qty=${qty}`);
    return response.data;
}