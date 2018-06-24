export const hasRole = (usuario, roles) => {
  if (!usuario.roles) {
    return false;
  }
  return usuario.roles.some(ur => roles.indexOf(ur.name) >= 0);
};
