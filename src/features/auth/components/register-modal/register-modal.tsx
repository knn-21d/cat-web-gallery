import { Button } from '../../../../components/button/button';
import { Input } from '../../../../components/input/input';
import { Modal } from '../../../../components/modal/modal';
import { setUser } from '../../../../utils/local-storage';
import styles from './register-modal.module.css';
import { useEffect, useRef, useState } from 'react';

type RegisterModalProps = {
  onRegister: () => void;
  onLogin: () => void;
  isOpen: boolean;
};

export function RegisterModal({
  onLogin,
  onRegister,
  isOpen,
}: RegisterModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [userNameValue, setUserNameValue] = useState('');

  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState<
    'empty' | 'notMatch' | null
  >(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    'empty' | 'notMatch' | null
  >(null);
  const [emailError, setEmailError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);

  const loginChangeHandler = (value: string) => {
    if (loginError) {
      setLoginError(false);
    }
    setLoginValue(value);
  };

  const userNameChangeHandler = (value: string) => {
    if (userNameError) {
      setUserNameError(false);
    }
    setUserNameValue(value);
  };

  const emailChangeHandler = (value: string) => {
    if (emailError) {
      setEmailError(false);
    }
    setEmailValue(value);
  };

  const passwordConfirmationHandler = (value: string) => {
    if (confirmPasswordError) {
      setConfirmPasswordError(null);
      if (confirmPasswordError === 'notMatch') {
        setPasswordError(null);
      }
    }
    setConfirmPasswordValue(value);
  };

  const passwordChangeHandler = (value: string) => {
    if (passwordError) {
      setPasswordError(null);
      if (passwordError === 'notMatch') {
        setConfirmPasswordError(null);
      }
    }
    setPasswordValue(value);
  };

  const registerClickHandler = () => {
    let error = false;
    if (passwordValue !== confirmPasswordValue) {
      setConfirmPasswordError('notMatch');
      setPasswordError('notMatch');
      error = true;
    }
    if (!loginValue.trim()) {
      setLoginError(true);
      error = true;
    }
    if (!passwordValue.trim()) {
      setPasswordError('empty');
      error = true;
    }
    if (!confirmPasswordValue.trim()) {
      setConfirmPasswordError('empty');
      error = true;
    }
    if (!emailValue.trim()) {
      setEmailError(true);
      error = true;
    }
    if (!userNameValue.trim()) {
      setUserNameError(true);
      error = true;
    }
    if (error) {
      return;
    }

    setUser({ login: userNameValue });
    onRegister();
  };

  return (
    <Modal ref={dialogRef} isOpen={isOpen} onClose={onLogin}>
      <div className={styles['register-wrapper']}>
        <h2>Create new account</h2>
        <div className={styles['form-wrapper']}>
          <Input
            value={emailValue}
            state={emailError ? 'error' : 'default'}
            onValueChange={emailChangeHandler}
            placeholder='email'
          ></Input>
          <Input
            placeholder='username'
            state={userNameError ? 'error' : 'default'}
            onValueChange={userNameChangeHandler}
            value={userNameValue}
          ></Input>
          <Input
            placeholder='login'
            state={loginError ? 'error' : 'default'}
            onValueChange={loginChangeHandler}
            value={loginValue}
          ></Input>
          <Input
            state={passwordError ? 'error' : 'default'}
            placeholder='password'
            onValueChange={passwordChangeHandler}
            value={passwordValue}
          ></Input>
          <Input
            onValueChange={passwordConfirmationHandler}
            state={confirmPasswordError ? 'error' : 'default'}
            placeholder='confirm password'
            value={confirmPasswordValue}
          ></Input>
          {passwordError === 'notMatch' &&
            confirmPasswordError === 'notMatch' && (
              <p className={styles.error}>passwords do not match</p>
            )}
          <Button onClick={registerClickHandler} appType='primary'>
            Register
          </Button>
          <Button onClick={onLogin}>Already have an account?</Button>
        </div>
      </div>
    </Modal>
  );
}
