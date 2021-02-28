import PropTypes from 'prop-types';

export const HistoryPropType = PropTypes.shape({
  push: PropTypes.func,
});

export const AppContextPropType = PropTypes.shape({
  token: PropTypes.string,
  username: PropTypes.string,
  setToken: PropTypes.func,
  setUsername: PropTypes.func,
});
