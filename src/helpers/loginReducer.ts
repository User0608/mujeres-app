import React from 'react'
export interface ActionLoginReducer {
  type: string
  username: string
  token: string
}
export interface StateLoginReducer {
  username: string
  token: string
  isLoading: boolean
}
export const initialLoginState: StateLoginReducer = {
  isLoading: true,
  username: "",
  token: "",
};
export const loginReducer = (state: StateLoginReducer, action: ActionLoginReducer): StateLoginReducer => {
  switch (action.type) {
    case 'RETRIEVE_TOKEN':
      return {
        ...state,
        token: action.token,
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...state,
        username: action.username,
        token: action.token,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        username:"",
        token:"",
        isLoading: false,
      };
    case 'REGISTER':
      return {
        ...state,
        username: action.username,
        token: action.token,
        isLoading: false,
      };
  }
  return { ...state };
};

