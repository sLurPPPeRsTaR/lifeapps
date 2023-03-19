import React from 'react';
import PropTypes from 'prop-types';
import crashlytics from '@react-native-firebase/crashlytics';

class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    crashlytics().setAttribute('stack', JSON.stringify(info));
    crashlytics().setAttribute('message', `${error.message}`);
    crashlytics().recordError(error);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
