import { createTheme } from '@mui/material';

export const theme = createTheme({
	palette: {
		mode: 'dark',
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 480,
			md: 768,
			lg: 1000,
			xl: 1440,
		},
	},
});
