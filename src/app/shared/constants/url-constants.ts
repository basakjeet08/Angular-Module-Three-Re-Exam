const FIREBASE_API_KEY = 'AIzaSyCw0lUQMpzCxMtFk3sf03ivGaVIToTDXVg';
export const FIREBASE_REGISTER_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
export const FIREBASE_LOGIN_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;

const FIREBASE_URL =
  'https://angular-module-three-re-exam-default-rtdb.asia-southeast1.firebasedatabase.app';

// User Endpoints
export const USER_CREATE_ENDPOINT = `${FIREBASE_URL}/users/:id.json`;
export const USER_FETCH_BY_ID_ENDPOINT = `${FIREBASE_URL}/users/:id.json`;
export const USER_UPDATE_ENDPOINT = `${FIREBASE_URL}/users/:id.json`;

// Product Endpoints
export const PRODUCT_CREATE_ENDPOINT = `${FIREBASE_URL}/products.json`;
export const PRODUCTS_FETCH_ALL_ENDPOINT = `${FIREBASE_URL}/products.json`;
export const PRODUCT_FETCH_BY_ID_ENDPOINT = `${FIREBASE_URL}/products/:id.json`;
export const PRODUCT_UPDATE_BY_ID_ENDPOINT = `${FIREBASE_URL}/products/:id.json`;

// Cart Endpoints
export const ADD_TO_CART_ENDPOINT = `${FIREBASE_URL}/users/:id.json`;

// Order Endpoints
export const ORDER_CREATE_ENDPOINT = `${FIREBASE_URL}/orders.json`;
export const ORDER_FETCH_BY_ID_ENDPOINT = `${FIREBASE_URL}/orders/:id.json`;
export const ORDER_FETCH_ALL_ENDPOINT = `${FIREBASE_URL}/orders.json`;
