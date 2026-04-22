import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Dictator Detected Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-10 text-center text-red-600 font-bold">کچھ غلط ہو گیا ہے۔ براہ کرم پیج ریفریش کریں۔</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
