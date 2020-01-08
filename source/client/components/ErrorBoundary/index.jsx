import React                  from 'react';
import { errorBoundaryType }  from 'Types/props';
import Icon                   from 'Components/Icon';

import styles from './styles.sass';

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
        <div className={styles.errorWrapper}>
          <div className={styles.errorContainer}>
            <Icon type='warning' width='80' height='80' className={styles.errorIcon} />
            <h1 className={styles.errorTitle}>Что-то пошло не так! :(</h1>
            <p className={styles.errorText}>В приложении произошла критическая ошибка!</p>
            <button className={styles.errorButton} onClick={() => location.reload()}>Перезагрузить</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}