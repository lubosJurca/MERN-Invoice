import {
  CreateInvoiceType,
  LoginUserTypes,
  RegisterFormTypes,
} from './utils/types';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ----------GET ALL INVOICES -----------------
export const getInvoicesByUser = async (filter = 'all', page = 0) => {
  const response = await fetch(
    `${API_BASE_URL}/invoices?filter=${filter}&page=${page}`,
    {
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to get invoices');
  }

  return response.json();
};

// ----------GET SINGLE INVOICE -----------------
export const getSingleInvoiceById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/invoices/${id}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to get invoice');
  }

  return response.json();
};

// ----------CREATE INVOICE -----------------
export const createInvoice = async (formData: CreateInvoiceType) => {
  const response = await fetch(`${API_BASE_URL}/invoices/createInvoice`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

// ----------EDIT INVOICE -----------------
export const editInvoice = async (id: string, formData: CreateInvoiceType) => {
  const response = await fetch(`${API_BASE_URL}/invoices/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

// ------------MARK AS PAID-----------------
export const markAsPaid = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/invoices/${id}`, {
    method: 'PATCH',
    credentials: 'include',
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

// -----------DELETE INVOICE-----------------
export const deleteInvoice = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/invoices/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to delete invoice');
  }
};

// ------------------------------------USERS ACTION--------------------------------

// ----------REGISTER USER -----------------
export const registerUser = async (formData: RegisterFormTypes) => {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

// ----------LOGIN USER -----------------
export const loginUser = async (formData: LoginUserTypes) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

// ----------GET CURRENT USER -----------------
export const getUser = async () => {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to validate token');
  }

  return response.json();
};

// ----------VALIDATE TOKEN -----------------
export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/validate-token`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to validate token');
  }

  return response.json();
};

// ----------LOGOUT USER -----------------
export const logoutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    credentials: 'include',
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to logout user');
  }
};
