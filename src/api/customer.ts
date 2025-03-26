import axios from 'axios';
import type { Customer } from "$lib/types/app/user";
import { URL } from '../api/index';


export const getById = async (id: string): Promise<Customer> => {
  const response = await axios.get(`${URL}/customers/${id}`);
  return response.data;
};

export const create = async (customerData: Omit<Customer, 'id'>): Promise<Customer> => {
  const response = await axios.post(`${URL}/customers`, customerData);
  return response.data;
};

export const updateById = async (id: string, customerData: Partial<Customer>): Promise<Customer> => {
  const response = await axios.put(`${URL}/customers/${id}`, customerData);
  return response.data;
};

export const deleteById = async (id: string): Promise<void> => {
  await axios.delete(`${URL}/customers/${id}`);
};