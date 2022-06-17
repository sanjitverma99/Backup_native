export const STORE_CURRENT_TITLE = "STORE_CURRENT_TITLE";

export function storeCurrentTitle(arr) {
  return {
    type: STORE_CURRENT_TITLE,
    payload: arr,
  };
}
