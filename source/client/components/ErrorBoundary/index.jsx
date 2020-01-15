import React from 'react';
import { errorBoundaryType } from 'Types/props';
import ErrorMessage from 'Components/ErrorMessage';

export default class ErrorBoundary extends React.Component {
  static propTypes = errorBoundaryType;

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