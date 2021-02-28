import PropTypes from 'prop-types';

export const HistoryPropType = PropTypes.shape({
  push: PropTypes.func,
});

export const AppContextPropType = PropTypes.shape({
  token: PropTypes.string,
});
