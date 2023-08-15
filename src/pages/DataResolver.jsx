import Loader from '../components/Loader/Loader';
import AppErrorPage from './AppErrorPage/AppErrorPage';
import { memo } from 'react';

const DataResolver = ({ data, error, loading, children }) => {
	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <AppErrorPage appError={error} />;
	}

	return <>{typeof children === 'function' ? children(data) : children}</>;
};

export default memo(DataResolver);
