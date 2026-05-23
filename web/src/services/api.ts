// src/services/api.ts

const BASE_URL = 'http://localhost:8080';

export const api = {
  login: async (data: any) => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.status === 401 || res.status === 403) throw new Error('Não autorizado');
      if (!res.ok) throw new Error('Erro ao fazer login');
      const json = await res.json();
      localStorage.setItem('token', json.token);
      localStorage.setItem('user', JSON.stringify(json));
      return json;
    } catch (error) {
      throw error;
    }
  },
  register: async (data: any) => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.status === 401 || res.status === 403) throw new Error('Não autorizado');
      if (!res.ok) throw new Error('Erro ao registrar');
      return res.json();
    } catch (error) {
      throw error;
    }
  },
  getObras: async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/obras`, {
        headers: { 'Authorization': `Bearer ${api.getToken()}` }
      });
      if (res.status === 401 || res.status === 403) throw new Error('Não autorizado');
      if (!res.ok) throw new Error('Erro ao buscar obras');
      return res.json();
    } catch (error) {
      throw error;
    }
  },
  getObra: async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/obras/${id}`, {
        headers: { 'Authorization': `Bearer ${api.getToken()}` }
      });
      if (res.status === 401 || res.status === 403) throw new Error('Não autorizado');
      if (!res.ok) throw new Error('Erro ao buscar obra');
      return res.json();
    } catch (error) {
      throw error;
    }
  },
  criarObra: async (obra: any) => {
    try {
      const res = await fetch(`${BASE_URL}/api/obras`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${api.getToken()}` 
        },
        body: JSON.stringify(obra)
      });
      if (res.status === 401 || res.status === 403) throw new Error('Não autorizado');
      if (!res.ok) throw new Error('Erro ao criar obra');
      return res.json();
    } catch (error) {
      throw error;
    }
  },
  editarObra: async (id: string, obra: any) => {
    try {
      const res = await fetch(`${BASE_URL}/api/obras/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${api.getToken()}` 
        },
        body: JSON.stringify(obra)
      });
      if (res.status === 401 || res.status === 403) throw new Error('Não autorizado');
      if (!res.ok) throw new Error('Erro ao editar obra');
      return res.json();
    } catch (error) {
      throw error;
    }
  },
  deletarObra: async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/obras/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${api.getToken()}` }
      });
      if (res.status === 401 || res.status === 403) throw new Error('Não autorizado');
      if (!res.ok) throw new Error('Erro ao deletar obra');
      return true;
    } catch (error) {
      throw error;
    }
  },
  getToken: () => localStorage.getItem('token'),
  getUser: () => JSON.parse(localStorage.getItem('user') || 'null'),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};