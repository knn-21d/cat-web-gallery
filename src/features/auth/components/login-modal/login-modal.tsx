import styles from './login-modal.module.css';
import { Input } from '../../../../components/input/input';
import { Button } from '../../../../components/button/button';
import { useRef, useState } from 'react';
import { setUser } from '../../../../utils/local-storage';
import { RegisterModal } from '../register-modal/register-modal';
import { Modal } from '../../../../components/modal/modal';

export type LoginModalProps = {
  isOpen: boolean;
  onLogin: () => void;
  onClose: () => void;
};

export function LoginModal({ isOpen, onLogin, onClose }: LoginModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const loginChangeHandler = (value: string) => {
    if (loginError) {
      setLoginError(false);
    }
    setLoginValue(value);
  };

  const passwordChangeHandler = (value: string) => {
    if (passwordError) {
      setPasswordError(false);
    }
    setPasswordValue(value);
  };

  const buttonClickHandler = () => {
    const isLoginError = !loginValue.trim();
    const isPaswordError = !passwordValue.trim();
    if (isLoginError) {
      setLoginError(isLoginError);
    }
    if (isPaswordError) {
      setPasswordError(isPaswordError);
    }
    if (isLoginError || isPaswordError) {
      return;
    }
    setUser({ login: loginValue });
    onLogin();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} ref={dialogRef}>
      <div className={styles['login-wrapper']}>
        <div className={styles['headings']}>
          <h2 className={styles.title}>Welcome to Cat's Gallery</h2>
          <h5>The best place to share your cute cats</h5>
        </div>
        <div className={styles['form-wrapper']}>
          <Input
            onValueChange={loginChangeHandler}
            state={loginError ? 'error' : 'default'}
            value={loginValue}
            required
            placeholder='login'
          ></Input>
          <Input
            required
            value={passwordValue}
            state={passwordError ? 'error' : 'default'}
            onValueChange={passwordChangeHandler}
            type='password'
            placeholder='password'
          ></Input>
          <Button onClick={buttonClickHandler} appType='primary'>
            Login
          </Button>
          <Button onClick={() => setIsRegisterModalOpen(true)}>Not registered yet?</Button>
        </div>
      </div>
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onRegister={() => {
          setIsRegisterModalOpen(false);
          onLogin();
        }}
        onLogin={() => setIsRegisterModalOpen(false)}
      />
    </Modal>
  );
}
