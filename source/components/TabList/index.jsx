import React from 'react';

import styles from './styles.sass';

function TabList() {
  return (
    <div className={styles.tablistBackground}>
      <div className={styles.tablistPlayerInfo}>
        <img className={styles.tablistPlayerAvatar} src='#' alt='Player avatar'/>
        <div className={styles.tablistPlayerScore}>
          <ul className={styles.tablistList}>
            <li className={styles.tablistListItem}>
              <span className={styles.tablistSpanName}>Имя:</span>
              <span className={styles.tablistSpanValue}>Superuser123</span>
            </li>
            <li className={styles.tablistListItem}>
              <span className={styles.tablistSpanName}>Квадратов:</span>
              <span className={styles.tablistSpanValue}>228</span>
            </li>
            <li className={styles.tablistListItem}>
              <span className={styles.tablistSpanName}>Площадь:</span>
              <span className={styles.tablistSpanValue}>1337</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.tablistPlayerInfo}>
        <img className={styles.tablistPlayerAvatar} src='#' alt='Player avatar'/>
        <div className={styles.tablistPlayerScore}>
          <ul className={styles.tablistList}>
            <li className={styles.tablistListItem}>
              <span className={styles.tablistSpanName}>Имя:</span>
              <span className={styles.tablistSpanValue}>Superuser123</span>
            </li>
            <li className={styles.tablistListItem}>
              <span className={styles.tablistSpanName}>Квадратов:</span>
              <span className={styles.tablistSpanValue}>228</span>
            </li>
            <li className={styles.tablistListItem}>
              <span className={styles.tablistSpanName}>Площадь:</span>
              <span className={styles.tablistSpanValue}>1337</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.tablistPlayerInfo}>
        <img className={styles.tablistPlayerAvatar} src='#' alt='Player avatar'/>
        <div className={styles.tablistPlayerScore}>
          <ul className={styles.tablistList}>
            <li className={styles.tablistListItem}>
              <span className={styles.tablistSpanName}>Имя:</span>
              <span className={styles.tablistSpanValue}>Superuser123</span>
            </li>
            <li className={styles.tablistListItem}>
              <span className={styles.tablistSpanName}>Квадратов:</span>
              <span className={styles.tablistSpanValue}>228</span>
            </li>
            <li className={styles.tablistListItem}>
              <span className={styles.tablistSpanName}>Площадь:</span>
              <span className={styles.tablistSpanValue}>1337</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.tablistPlayerInfo}>
        <img className={styles.tablistPlayerAvatar} src='#' alt='Player avatar'/>
        <div className={styles.tablistPlayerScore}>
          <ul className={styles.tablistList}>
            <li className={styles.tablistListItem}>
              <span className={styles.tablistSpanName}>Имя:</span>
              <span className={styles.tablistSpanValue}>Superuser123</span>
            </li>
            <li className={styles.tablistListItem}>
              <span className={styles.tablistSpanName}>Квадратов:</span>
              <span className={styles.tablistSpanValue}>228</span>
            </li>
            <li className={styles.tablistListItem}>
              <span className={styles.tablistSpanName}>Площадь:</span>
              <span className={styles.tablistSpanValue}>1337</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export { TabList };