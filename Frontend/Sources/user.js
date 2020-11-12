export const getUserId = (cookie) => {
  const token = cookie.split('=')[1].split('.');
  const { userId } = JSON.parse(window.atob(token[1].replace('_', '/').replace('-', '+')));
  return userId;
};

export const getUserImageLink = (cookie) => {
  const token = cookie.split('=')[1].split('.');
  const { imageLink } = JSON.parse(window.atob(token[1].replace('_', '/').replace('-', '+')));
  return imageLink;
};
