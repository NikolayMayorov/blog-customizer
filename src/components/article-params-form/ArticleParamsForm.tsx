import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { useCallback, useEffect, useState, memo, useRef } from 'react';
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

type ArticleParamsFormProps = {
	onChange: (params: ArticleParams) => void;
};

export interface ArticleParams {
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
	fontSizeOption: OptionType;
}

export const ArticleParamsForm = ({ onChange }: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [params, setParams] = useState<ArticleParams>({
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
		fontSizeOption: defaultArticleState.fontSizeOption,
	});

	const refOptionArea = useRef<HTMLElement | null>(null);

	useEffect(() => {
		function handleClickOutside(evt: MouseEvent) {
			const target = evt.target as HTMLElement;
			if (target.closest(`.${stylesArrowButton.container}`)) {
				return;
			}
			if (!target.closest(`.${styles.container_open}`)) {
				setIsMenuOpen(false);
			}
		}
		if (!isMenuOpen) return;
		window.addEventListener('mousedown', handleClickOutside);
		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const handleChangeOption = useCallback(
		(nameOption: string, option: OptionType) => {
			setParams((prevState) => ({
				...prevState,
				[nameOption]: option,
			}));
		},
		[]
	);

	const handleChangeFont = useCallback((option: OptionType) => {
		handleChangeOption('fontFamilyOption', option);
	}, []);

	const handleChangeFontSize = useCallback((option: OptionType) => {
		handleChangeOption('fontSizeOption', option);
	}, []);

	const handleChangeFontColor = useCallback((option: OptionType) => {
		handleChangeOption('fontColor', option);
	}, []);

	const handleChangeBackgroundColor = useCallback((option: OptionType) => {
		handleChangeOption('backgroundColor', option);
	}, []);

	const handleChangeContentWidth = useCallback((option: OptionType) => {
		handleChangeOption('contentWidth', option);
	}, []);

	const handlerArrowClick = function () {
		setIsMenuOpen((prev) => !prev);
	};

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		onChange(params);
	};

	const handleReset = () => {
		setParams({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontSizeOption: defaultArticleState.fontSizeOption,
		});
		onChange({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontSizeOption: defaultArticleState.fontSizeOption,
		});
	};

	const MemoizedSelect = memo(Select);
	const MemoizedRadio = memo(RadioGroup);
	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => {
					handlerArrowClick();
				}}
			/>
			<aside
				ref={refOptionArea}
				className={`${styles.container} ${
					isMenuOpen && styles.container_open
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<MemoizedSelect
						title='шрифт'
						options={fontFamilyOptions}
						selected={params.fontFamilyOption}
						onChange={handleChangeFont}
					/>
					<br />
					<br />
					<br />
					<br />
					<MemoizedRadio
						title='размер шрифта'
						options={fontSizeOptions}
						selected={params.fontSizeOption}
						name='font-size-option'
						onChange={handleChangeFontSize}
					/>
					<br />
					<br />
					<br />
					<br />
					<MemoizedSelect
						title='цвет шрифта'
						options={fontColors}
						selected={params.fontColor}
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
					<MemoizedSelect
						title='цвет фона'
						options={backgroundColors}
						selected={params.backgroundColor}
						onChange={handleChangeBackgroundColor}
					/>
					<br />
					<br />
					<br />
					<br />
					<MemoizedSelect
						title='ширина контента'
						options={contentWidthArr}
						selected={params.contentWidth}
						onChange={handleChangeContentWidth}
					/>
					<br />
					<br />
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
