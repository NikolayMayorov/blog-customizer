import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { useEffect, useState } from 'react';
import stylesArrowButton from 'src/ui/arrow-button/ArrowButton.module.scss';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		function handleClickOutside(evt: MouseEvent) {
			const target = evt.target as HTMLElement;
			if (
				!target.closest(`.${styles.container_open}`) &&
				!target.closest(`.${stylesArrowButton.container_open}`)
			) {
				setIsOpen(false);
			}
		}
		window.addEventListener('click', handleClickOutside);
		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	}, []);

	function toggleIsOpen() {
		setIsOpen((prev) => !prev);
	}
	const handlerArrowClick = function () {
		toggleIsOpen();
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					handlerArrowClick();
				}}
			/>
			<aside
				className={`${styles.container} ${isOpen && styles.container_open}`}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
