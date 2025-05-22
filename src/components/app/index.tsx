import { CSSProperties, useRef } from 'react';
//import clsx from 'clsx';

import { Article } from 'src/components/article/Article';
import {
	ArticleParamsForm,
	ArticleParams,
} from 'src/components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';

import 'src/styles/index.scss';
import styles from 'src/styles/index.module.scss';

export const App = () => {
	const refMain = useRef<HTMLElement | null>(null);
	const handleChangeOption = (params: ArticleParams) => {
		if (refMain.current) {
			refMain.current.style.setProperty(
				'--font-family',
				params.fontFamilyOption.value
			);
			refMain.current.style.setProperty(
				'--font-size',
				params.fontSizeOption.value
			);
			refMain.current.style.setProperty('--font-color', params.fontColor.value);
			refMain.current.style.setProperty(
				'--container-width',
				params.contentWidth.value
			);
			refMain.current.style.setProperty(
				'--bg-color',
				params.backgroundColor.value
			);
		}
	};

	return (
		<main
			ref={refMain}
			className={styles.main}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onChange={handleChangeOption} />
			<Article />
		</main>
	);
};
