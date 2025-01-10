import { Box, Title } from '@mantine/core';
import { ArticlesCardsGrid } from './ui/Articlescardsgrid/ArticlesCardsGrid';

export default function BodyNews() {
	return (
		<Box>

			<Box maw="100%" bg="" pt="50px" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Title order={1}>
					NEWS
				</Title>
			</Box>
			<Box  style={{
				width: '50px',
				height: '4px',
				margin: '8px auto 0',
				background: 'linear-gradient(to right, #6a11cb, #2575fc)',
				borderRadius: '4px',
			}}></Box>
			<ArticlesCardsGrid></ArticlesCardsGrid>
		</Box>
	);
}