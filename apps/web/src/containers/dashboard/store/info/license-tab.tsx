import { Container, Grid, Stack } from '@mantine/core';
import React from 'react';
import IntegrationForm from '@component/Form/intergration-form.tsx';
import PharmacyForm from '@component/Form/pharmacy-form.tsx';

const LicenseTab = () => {
	return (
		<Grid columns={8}>
			<Grid.Col span={8}>
				<IntegrationForm />
			</Grid.Col>
			{/*<Grid.Col span={4}>*/}
			{/*</Grid.Col>*/}
		</Grid>
	);
};

export default LicenseTab;