import PropTypes from 'prop-types';
import React, { Component } from 'react';

// export default class ErrorBoundary extends Component {
class ErrorBoundary extends Component {
  state = {
    error: '',
    errorInfo: '',
    hasError: false,
  };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.log({ error, errorInfo });
    this.setState({ errorInfo });
  }
  render() {
    const { hasError, errorInfo } = this.state;
    if (hasError) {
      return (
        <div className="card my-5">
          <div className="card-header">
            <p>
              There was an error in loading this page.{' '}
              <span
                style={{ cursor: 'pointer', color: '#0077FF' }}
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reload this page
              </span>{' '}
            </p>
          </div>
          <div className="card-body">
            <details className="error-details">
              <summary>Click for error details</summary>
              {errorInfo && errorInfo.componentStack.toString()}
            </details>
          </div>
        </div>
      );
    }
  return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]).isRequired,
};

export default ErrorBoundary;

/*
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}

export default ErrorBoundary;
*/