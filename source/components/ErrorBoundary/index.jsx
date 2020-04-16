import React from 'react';
import { node } from 'prop-types';
import ErrorMessage from 'Components/ErrorMessage';

export default class ErrorBoundary extends React.Component {
  static propTypes = {
    children: node.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorMessage
          errorTitle='Что-то пошло не так! :('
          errorText='В приложении произошла критическая ошибка!'
          reloadBtn={true}
        />
      );
    }

    return this.props.children;
  }
}