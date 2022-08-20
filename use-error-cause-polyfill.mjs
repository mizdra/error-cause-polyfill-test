import 'error-cause-polyfill/auto'; // Pure ESM

const internalError = new Error('Original error');
const appError = new Error('App error', { cause: internalError });

throw appError;
