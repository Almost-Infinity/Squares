import React from 'react';
import Icon from 'Components/Icon';
import { errorMessageType } from 'Types/props';

import styles from './styles.sass';

function ErrorMessage(props) {
  const { errorTitle, errorText, reloadBtn = false } = props;

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

ErrorMessage.propTypes = errorMessageType;
export default ErrorMessage;