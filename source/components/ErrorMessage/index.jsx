import React from 'react';
import Icon from 'Components/Icon';
import { string, bool } from 'prop-types';

import styles from './styles.sass';

function ErrorMessage(props) {
  const { errorTitle, errorText, reloadBtn } = props;

  return (
    <div className={styles.error}>
      <div className={styles.errorContainer}>
        <Icon type='warning' width='80' height='80' className={styles.errorIcon} />
        <h1 className={styles.errorTitle}>{errorTitle}</h1>
        <p className={styles.errorText}>{errorText}</p>
        {
          reloadBtn && <button className={styles.errorButton} onClick={() => location.reload()}>Перезагрузить</button>
        }
      </div>
    </div>
  );
}

ErrorMessage.propTypes = {
  errorTitle: string.isRequired,
  errorText: string.isRequired,
  reloadBtn: bool
};

ErrorMessage.defaultProps = {
  reloadBtn: false
};

export default ErrorMessage;