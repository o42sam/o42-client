import axios from 'axios';
import type { Agent } from "$lib/types/app/user";
import { API_URL } from '.';


export const getById = async (id: string): Promise<Agent> => {
  const response = await axios.get(`${API_URL}/agents/${id}`);
  return response.data;
};

export const create = async (agentData: Omit<Agent, 'id'>): Promise<Agent> => {
  const response = await axios.post(`${API_URL}/agents`, agentData);
  return response.data;
};

export const updateById = async (id: string, agentData: Partial<Agent>): Promise<Agent> => {
  const response = await axios.put(`${API_URL}/agents/${id}`, agentData);
  return response.data;
};

export const deleteById = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/agents/${id}`);
};