import axios from 'axios';
import type { Customer } from "$lib/types/app/user";
import { API_URL } from '.';


export const getById = async (id: string): Promise<Customer> => {
  const response = await axios.get(`${API_URL}/customers/${id}`);
  return response.data;
};

export const create = async (customerData: Omit<Customer, 'id'>): Promise<Customer> => {
  const response = await axios.post(`${API_URL}/customers`, customerData);
  return response.data;
};

export const updateById = async (id: string, customerData: Partial<Customer>): Promise<Customer> => {
  const response = await axios.put(`${API_URL}/customers/${id}`, customerData);
  return response.data;
};

export const deleteById = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/customers/${id}`);
};