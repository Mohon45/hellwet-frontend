import Cookies from "universal-cookie";
const cookies = new Cookies();

/**
 * Checks if user is authenticated
 */
const isAuthorized = () => {
  const user = getLoggedInUser();
  if (isAuthenticated() && user) {
    return true;
  } else {
    return false;
  }
};

const isAuthenticated = () => {
  const user = getLoggedInUser();
  if (!user) {
    deleteCookies();
    return false;
  } else {
    return true;
  }
};

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  let userData = { name: user?.name, email: user?.email };

  return user ? userData : null;
};

const deleteCookies = () => {
  cookies.remove("name", { path: "/" });
  cookies.remove("token", { path: "/" });
  cookies.remove("refreshToken", { path: "/" });
  cookies.remove("tokenExp", { path: "/" });
};

export { isAuthenticated, getLoggedInUser, isAuthorized, deleteCookies };
