export const HIDE_MESSAGE = '[BACKDROP] CLOSE';
export const SHOW_MESSAGE = '[BACKDROP] SHOW';

export function showBackdrop(message) {
  return {
    type: SHOW_MESSAGE,
    payload: message,
  };
}

export function hideBackdrop() {
  return {
    type: HIDE_MESSAGE,
  };
}
