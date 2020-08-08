export const generateId = (): string => {
  let password = '';
  const passwordLength = 20;
  for (let i = 0; i < passwordLength; i += 1) {
    password += Math.random().toString(32).substr(-2, 1);
  }

  return password;
};
