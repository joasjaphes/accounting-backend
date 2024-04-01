export const passwordRegex = new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$');

export const isPasswordValid = (password:string) => passwordRegex.test(password);