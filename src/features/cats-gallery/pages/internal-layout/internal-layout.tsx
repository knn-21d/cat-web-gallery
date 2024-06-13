import { Button } from '../../../../components/button/button';
import { clearUser } from '../../../../utils/local-storage';
import { LoginModal } from '../../../auth/components/login-modal/login-modal';
import styles from './internal-layout.module.css';
import { PropsWithChildren, useState } from 'react';

export function InternalLayout({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('user') !== null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const logoutHandler = () => {
    setIsLoggedIn(false);
    clearUser();
  };

  return (
    <>
      <div>
        <div className={styles.header}>
          <h2>Cats gallery</h2>
          <Button
            onClick={isLoggedIn ? logoutHandler : () => setIsModalOpen(true)}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </div>
        <div className={styles.content}>{children}</div>
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
