// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: "/login",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  playground: path(ROOTS_DASHBOARD, "/playground"),
  history: path(ROOTS_DASHBOARD, "/history"),
  starred: path(ROOTS_DASHBOARD, "/starred"),
  settings: path(ROOTS_DASHBOARD, "/settings"),
  flightMap: path(ROOTS_DASHBOARD, "/flight-map"),
  searchAirport: "/search-airport",
  //   one: path(ROOTS_DASHBOARD, '/one'),
  //   two: path(ROOTS_DASHBOARD, '/two'),
  //   three: path(ROOTS_DASHBOARD, '/three'),
  //   user: {
  //     root: path(ROOTS_DASHBOARD, '/user'),
  //     four: path(ROOTS_DASHBOARD, '/user/four'),
  //     five: path(ROOTS_DASHBOARD, '/user/five'),
  //     six: path(ROOTS_DASHBOARD, '/user/six'),
  //   },
};
