// ErrorBoundary.js

import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    // Here you can send error details to a server or error logging service
  }

  handleTryAgain = () => {
    // Logic to reset the error state and attempt to recover the app
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Optionally, insert recovery logic here or reset app state
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div style={{ margin: '30px', textAlign: 'center' }}>
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: 'pre-wrap', marginBottom: '20px', textAlign: 'left' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
          <button onClick={this.handleTryAgain}>Try Again</button>
          {/* Additional content or links for the user */}
        </div>
      );
    }

    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
