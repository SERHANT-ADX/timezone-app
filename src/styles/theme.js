import { createTheme } from '@mui/material';

export const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 480,
			md: 768,
			lg: 1000,
			xl: 1440,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					textDecoration: 'none',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: '8px',
					fontSize: '14px',
					fontWeight: '500',
					lineHeight: '24px',
					letterSpacing: '0.4px',
					cursor: 'pointer',
				},
				outlined: {
					border: '1px solid #BCC0D6 !important',
					background: '#FFF !important',
					color: '#43545C !important',
				},
				contained: {
					border: 'none',
					background: '#131176 !important',
					color: ' #FFF !important',
				},
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					fontSize: '14px',
					fontWeight: '500',
					lineHeight: '24px',
					letterSpacing: '0.4px',
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					maxWidth: '200px',
					display: 'flex',
					padding: '8px 12px',
					alignItems: 'flex-start',
					gap: '10px',
					borderRadius: '8px',
					background: '#34364B !important',
					color: '#FFF',
					fontSize: '12px',
					fontWeight: '400',
					lineHeight: '20px',
				},
				arrow: {
					color: '#34364B !important',
				},
			},
		},
	},
});
