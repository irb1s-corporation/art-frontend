import React, {FC, useState} from 'react';
import styles from './Header.module.scss';

const Header: FC = () => {
    const [isAuth, SetIsAuth] = useState(false);
    return (
        <header className={styles.header}>

        </header>
    );
};

export default Header;