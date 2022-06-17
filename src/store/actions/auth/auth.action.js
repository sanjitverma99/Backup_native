export const STORE_USER_DATA = "[USER] STORE_USER_DATE";
export const STORE_TOKEN = "[USER] STORE_TOKEN";
export const SIGN_OUT = "[USER] SIGN_OUT";

export function storeProfile(data) {
  return {
    type: STORE_USER_DATA,
    payload: data,
  };
}

export function storeToken(token) {
  return {
    type: STORE_TOKEN,
    payload: token,
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}
