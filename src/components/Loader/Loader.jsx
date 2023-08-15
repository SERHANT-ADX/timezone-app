import { Box, CircularProgress } from '@mui/material';
import { memo } from 'react';

const Loader = ({ sx = {} }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100vh',
				maxHeight: '100%',
				...sx,
			}}
		>
			<CircularProgress />
		</Box>
	);
};

export default memo(Loader);
