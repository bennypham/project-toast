import React from 'react';

import Button from '../Button';
import Toast from '../Toast/Toast';
import ToastShelf from '../ToastShelf/ToastShelf';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
	const [message, setMessage] = React.useState('');
	const [variant, setVariant] = React.useState('notice');
	// const [isToastToggled, setIsToastToggled] = React.useState(false);
	const [toasts, setToasts] = React.useState([]);

	function handleNewToast(toast) {
		toast.preventDefault();
		// console.log(toast);
		// setIsToastToggled(true);
		const newToast = {
			...toast,
			id: crypto.randomUUID(),
			message,
			variant,
		};

		// console.log(newToast);
		const nextToast = [...toasts, newToast];
		setToasts(nextToast);
		setMessage('');
		setVariant('notice');
	}

	function handleToastDismiss(t) {
		const newToasts = toasts.filter((toast) => {
			return toast.id !== t;
		});

		setToasts(newToasts);
	}

	return (
		<form onSubmit={handleNewToast}>
			<div className={styles.wrapper}>
				<header>
					<img alt="Cute toast mascot" src="/toast.png" />
					<h1>Toast Playground</h1>
				</header>
				{/* {isToastToggled && (
					<Toast onDismiss={handleToastDismiss} variant={variant}>
						{message}
					</Toast>
				)} */}
				<ToastShelf toasts={toasts} onDismiss={handleToastDismiss} />
				<div className={styles.controlsWrapper}>
					<div className={styles.row}>
						<label
							htmlFor="message"
							className={styles.label}
							style={{ alignSelf: 'baseline' }}
						>
							Message
						</label>
						<div className={styles.inputWrapper}>
							<textarea
								id="message"
								// required
								value={message}
								className={styles.messageInput}
								onChange={(event) => setMessage(event.target.value)}
							/>
							{/* <p>
								<strong>Message:</strong>
								{message || '(empty)'}
							</p> */}
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>Variant</div>
						<div
							className={`${styles.inputWrapper} ${styles.radioWrapper}`}
						>
							{VARIANT_OPTIONS.map((option) => {
								const id = `variant-${option}`;

								return (
									<label htmlFor={id} key={id}>
										<input
											id={id}
											type="radio"
											name="variant"
											value={option}
											checked={option === variant}
											onChange={(event) =>
												setVariant(event.target.value)
											}
										/>
										{option}
									</label>
								);
							})}
							{/* <p>
								<strong>Variant:</strong>
								{variant || 'undefined'}
							</p> */}
						</div>
					</div>

					<div className={styles.row}>
						<div className={styles.label} />
						<div
							className={`${styles.inputWrapper} ${styles.radioWrapper}`}
						>
							<Button type="submit">Pop Toast!</Button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}

export default ToastPlayground;
