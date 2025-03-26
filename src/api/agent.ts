import axios from 'axios';
import type { Agent } from "$lib/types/app/user";
import { URL } from '.';


export const getById = async (id: string): Promise<Agent> => {
  const response = await axios.get(`${URL}/agents/${id}`);
  return response.data;
};

export const create = async (agentData: Omit<Agent, 'id'>): Promise<Agent> => {
  const response = await axios.post(`${URL}/agents`, agentData);
  return response.data;
};

export const updateById = async (id: string, agentData: Partial<Agent>): Promise<Agent> => {
  const response = await axios.put(`${URL}/agents/${id}`, agentData);
  return response.data;
};

export const deleteById = async (id: string): Promise<void> => {
  await axios.delete(`${URL}/agents/${id}`);
};