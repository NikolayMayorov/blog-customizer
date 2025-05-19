import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { useEffect, useState } from 'react';
import stylesArrowButton from 'src/ui/arrow-button/ArrowButton.module.scss';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	defaultArticleState,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	// const [paramOptions, setParamOptions] = useState<OptionType[]>([
	// 	defaultArticleState.fontFamilyOption,
	// 	defaultArticleState.fontSizeOption,
	// ]);

	useEffect(() => {
		function handleClickOutside(evt: MouseEvent) {
			const target = evt.target as HTMLElement;
			if (
				!target.closest(`.${styles.container_open}`) &&
				!target.closest(`.${stylesArrowButton.container_open}`)
			) {
				//TOFIX: setIsOpen(false);
				//	setIsOpen(false);
			}
		}
		window.addEventListener('click', handleClickOutside);
		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	}, []);

	function handleChangeFont(option: OptionType) {
		console.log('Selected font:', option);
	}

	function handleChangeFontSize(option: OptionType) {
		console.log('Selected font size:', option);
	}

	function handleChangeFontColor(option: OptionType) {
		console.log('Selected font color:', option);
	}

	function handleChangeBackgroundColor(option: OptionType) {
		console.log('Selected background color:', option);
	}

	function handleChangeContentWidth(option: OptionType) {
		console.log('Selected content width:', option);
	}

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
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={defaultArticleState.fontFamilyOption}
						onChange={handleChangeFont}
					/>
					<br />
					<br />
					<br />
					<br />
					<RadioGroup
						title='размер шрифта'
						options={fontSizeOptions}
						selected={defaultArticleState.fontSizeOption}
						name='font-size-option'
						onChange={handleChangeFontSize}
					/>
					<br />
					<br />
					<br />
					<br />
					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={defaultArticleState.fontColor}
						onChange={handleChangeFontColor}
					/>
					<br />
					<br />
					<br />
					<br />
					<Separator />
					<br />
					<br />
					<br />
					<br />
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={defaultArticleState.backgroundColor}
						onChange={handleChangeBackgroundColor}
					/>
					<br />
					<br />
					<br />
					<br />
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={defaultArticleState.contentWidth}
						onChange={handleChangeContentWidth}
					/>
					<br />
					<br />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
