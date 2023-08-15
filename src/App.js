import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './styles/theme';
import './styles/App.css';
import './styles/fonts.css';
import LayoutProvider from './pages/LayoutProvider';
import CssBaseline from '@mui/material/CssBaseline';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchInterval: false,
			refetchOnReconnect: true,
			retry: 3,
			keepPreviousData: true,
			staleTime: 10 * 1000,
			cacheTime: 3 * 60 * 1000,
		},
	},
});
const App = () => (
	<div id="app">
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<QueryClientProvider client={queryClient}>
				<LayoutProvider />
			</QueryClientProvider>
		</ThemeProvider>
	</div>
);

export default App;
