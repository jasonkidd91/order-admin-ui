import React from 'react';
import { connect } from 'react-redux';
import { globalToast } from './redux/slice';

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{ handleError: typeof globalToast }, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
    this.catchError = this.catchError.bind(this);
  }

  static getDerivedStateFromError(error: any) {
    console.error(JSON.stringify(error));
    return { hasError: true };
  }

  componentDidMount(): void {
    window.onerror = this.catchError;
    window.onunhandledrejection = this.catchError;
  }

  componentDidCatch(error: any, errorInfo: any): void {
    this.catchError(error, errorInfo);
  }

  catchError(...e: any): void {
    console.error(JSON.stringify(e));
    // this.props.handleError('error', 'Internal Server Error, Kindly Contact the System Admin.');
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // render something else
      // return <h1>Oops, we done goofed up</h1>;
    }

    try {
      return this.props.children;
    } catch (err) {
      this.catchError(err);
      return null;
    }
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleError: (msgType: any, msgContent: any) => dispatch(globalToast(msgType, msgContent)),
  };
};

export default React.memo(connect(null, mapDispatchToProps)(ErrorBoundary));
