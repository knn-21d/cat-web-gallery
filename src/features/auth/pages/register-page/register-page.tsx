import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/button/button';
import { Input } from '../../../../components/input/input';
import styles from './register-page.module.css';
import { useState } from 'react';

export function RegisterPage() {
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

    const navigate = useNavigate()

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
        if (passwordValue !== confirmPasswordValue) {
            setConfirmPasswordError('notMatch');
            setPasswordError('notMatch');
        }
        if (!loginValue.trim()) {
            setLoginError(true);
        }
        if (!passwordValue.trim()) {
            setPasswordError('empty');
        }
        if (!confirmPasswordValue.trim()) {
            setConfirmPasswordError('empty');
        }
        if (!emailValue.trim()) {
            setEmailError(true);
        }
        if (!userNameValue.trim()) {
            setUserNameError(true);
        }
        if (loginError || passwordError || confirmPasswordError || emailError || userNameError) {
            return;
        }

        navigate('/forum')
    }

	return (
		<div className={styles.container}>
			<div className={styles['register-wrapper']}>
				<h2>Create new account</h2>
				<div className={styles['form-wrapper']}>
					<Input
						value={emailValue}
						state={emailError ? 'error' : 'default'}
						onValueChange={emailChangeHandler}
						placeholder="email"
					></Input>
					<Input
						placeholder="username"
						state={userNameError ? 'error' : 'default'}
						onValueChange={userNameChangeHandler}
						value={userNameValue}
					></Input>
					<Input
						placeholder="login"
						state={loginError ? 'error' : 'default'}
						onValueChange={loginChangeHandler}
						value={loginValue}
					></Input>
					<Input
						state={passwordError ? 'error' : 'default'}
						placeholder="password"
						onValueChange={passwordChangeHandler}
						value={passwordValue}
					></Input>
					<Input
						onValueChange={passwordConfirmationHandler}
						state={confirmPasswordError ? 'error' : 'default'}
						placeholder="confirm password"
						value={confirmPasswordValue}
					></Input>
                    {passwordError === 'notMatch' && confirmPasswordError === 'notMatch' && (
                        <p className={styles.error}>passwords do not match</p>
                    )}
					<Button onClick={registerClickHandler} appType="primary">Register</Button>
					<Link to="/login">Already have an account?</Link>
				</div>
			</div>
		</div>
	);
}
