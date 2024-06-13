import { Link } from 'react-router-dom';
import { Button } from '../../../../components/button/button';
import { clearUser } from '../../../../utils/local-storage';
import { LoginModal } from '../../../auth/components/login-modal/login-modal';
import { CatsPage } from '../cats-page/cats-page';
import styles from './internal-layout.module.css';
import { PropsWithChildren, useState } from 'react';

export function InternalLayout({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('user') !== null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const logoutHandler = () => {
    setIsLoggedIn(false);
    clearUser();
  };

  return (
    <>
      <div>
        <div className={styles.header}>
          <Link className={styles.link} to='/'>
            <h2>Cats gallery</h2>
          </Link>
          <Button
            onClick={isLoggedIn ? logoutHandler : () => setIsModalOpen(true)}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </div>
        <div className={styles.content}>
          {children ?? <CatsPage isAuthorized={isLoggedIn}></CatsPage>}
        </div>
      </div>
      <LoginModal
        isOpen={isModalOpen}
        onLogin={() => {
          setIsLoggedIn(true);
          setIsModalOpen(false);
        }}
        onClose={() => setIsModalOpen(false)}
      ></LoginModal>
    </>
  );
}
