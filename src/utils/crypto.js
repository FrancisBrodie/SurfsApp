import * as bcrypt from "bcrypt";

export const hashPassword = (pw) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(pw, salt);
};

export const checkPassword = (pw, hashedPw) => {
  return bcrypt.compareSync(pw, hashedPw);
};
