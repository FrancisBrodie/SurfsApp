import * as bcrypt from "bcrypt";

export const hashPassword = (pw) => {
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(pw, salt);
  return hashedPassword;
};

export const passwordMatches = (pw, hashedPw) => {
  return bcrypt.compareSync(pw, hashedPw);
};
