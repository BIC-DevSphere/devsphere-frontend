import axios from "axios";

const BASE_URL = 'https://localhost:3000/api';
const AUTH_URL = `${BASE_URL}/auth`;

const BASE_API_ENDPOINTS = {
    "createMember": `${BASE_URL}/members`,
    "addProject": `${BASE_URL}/projects/add`,
};

const AUTH_API_ENDPOINTS = {
    "signup": `${AUTH_URL}/sign-up/email`,
    "signin": `${AUTH_URL}/sign-in/email`,
    "signout": `${AUTH_URL}/sign-out`,
    "requestResetPassword": `${AUTH_URL}/request-password-reset`,
    "resetPassword": `${AUTH_URL}/reset-password`,
    "changePassword": `${AUTH_URL}/change-password`,
};

export const signin = async() => {

}

export const signup = async() => {

}

export const signout = async() => {

}

export const requestResetPassword = async() => {

}

export const resetPassword = async() => {

}

export const changePassword = async() => {

}

export const createMember = async() => {

}

export const addProject = async() => {

}

