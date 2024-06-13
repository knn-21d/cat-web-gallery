import { Link, useNavigate } from 'react-router-dom';
import styles from './login-page.module.css';
import { Input } from '../../../../components/input/input';
import { Button } from '../../../../components/button/button';
import { useState } from 'react';

export function LoginPage() {
	const [loginValue, setLoginValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');

	const [loginError, setLoginError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const navigate = useNavigate();

    const loginChangeHandler = (value: string) => {
        if (loginError) {
            setLoginError(false);
        }
        setLoginValue(value)
    }

    const passwordChangeHandler = (value: string) => {
        if (passwordError) {
            setPasswordError(false);
        }
        setPasswordValue(value)
    }

	const buttonClickHandler = () => {
        const isLoginError = !loginValue.trim()
        const isPaswordError = !passwordValue.trim()
		if (isLoginError) {
			setLoginError(isLoginError);
		}
		if (isPaswordError) {
			setPasswordError(isPaswordError);
		}
		if (isLoginError || isPaswordError) {
			return;
		}

		navigate('/forum');
	};

	return (
		<div className={styles.container}>
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
						placeholder="login"
					></Input>
					<Input
						required
						value={passwordValue}
                        state={passwordError ? 'error' : 'default'}
						onValueChange={passwordChangeHandler}
						type="password"
						placeholder="password"
					></Input>
					<Button onClick={buttonClickHandler} appType="primary">
						Login
					</Button>
					<Link to="/register">Not registered yet?</Link>
				</div>
			</div>
		</div>
	);
}
