import React, { Component, ReactNode } from "react";
import ErrorPage from "./components/ErrorPage/ErrorPage";

interface Props {
  children: ReactNode;
}

interface State {
  error?: Error;
}

export class GeneralErrorBoundary extends Component<Props, State> {
  state: State = {};

  static getDerivedStateFromError = (error: Error): State => ({
    error,
  });

  handleRemoveError = () => {
    this.setState({
      error: undefined,
    });
  };

  render() {
    return (
      <>
        {this.state.error ? (
          <ErrorPage handleRemoveError={this.handleRemoveError} />
        ) : (
          this.props.children
        )}
      </>
    );
  }
}
