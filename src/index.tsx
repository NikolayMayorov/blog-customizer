import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useRef } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	ArticleParams,
} from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
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
			className={clsx(styles.main)}
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

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
