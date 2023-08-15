import Layout from './Layout';
import { createContext, memo, useContext, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import DataResolver from './DataResolver';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone);

const AppContext = createContext();
const apiUrl = 'http://localhost:8000/';
const axiosConfig = axios.create({
	baseURL: apiUrl,
	timeout: 1000,
	withCredentials: true,
	responseType: 'json',
	headers: {
		'Content-Type': 'application/json',
		// 'Access-Control-Allow-Origin': '*',
		// 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
		// 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
		// 'Access-Control-Allow-Credentials': true,
	},
});

const LayoutProvider = () => {
	const [userName, setUserName] = useState(localStorage.getItem('userName') || null);
	const [timezone, setTimezone] = useState(localStorage.getItem('timezone') || null);

	const [showCreateProfileModal, setShowCreateProfileModal] = useState(false);
	const [showSetNameModal, setShowSetNameModal] = useState(false);

	const userTimezone = localStorage.getItem('timezone');

	if (!userTimezone) {
		const userTimezone = dayjs.tz.guess();
		console.log('userTimezone');
		localStorage.setItem('timezone', userTimezone);
		setTimezone(userTimezone);
	}

	const { data, isLoading, isError, error, refetch } = useQuery(['teamList'], async () => {
		const response = await axiosConfig.get('teamList');
		return await response?.data;
	});

	const createNewTeammate = useMutation({
		mutationKey: ['createNewTeammate'],
		mutationFn: (newTeammate) => {
			return axiosConfig.post('teamList', newTeammate);
		},
	});

	const contextValue = useMemo(
		() => ({
			showCreateProfileModal,
			setShowCreateProfileModal,
			teammatesList: data,
			isLoading,
			isError,
			error,
			userName,
			setUserName,
			createNewTeammate,
			timezone,
			setTimezone,
			showSetNameModal,
			setShowSetNameModal,
		}),
		[
			showCreateProfileModal,
			setShowCreateProfileModal,
			data,
			isLoading,
			isError,
			error,
			createNewTeammate,
			timezone,
			setTimezone,
			userName,
			setUserName,
			showSetNameModal,
			setShowSetNameModal,
		],
	);

	useEffect(() => {
		refetch(['teamList']);
	}, [userName]);

	if (!userName && !showSetNameModal) {
		setShowSetNameModal(true);
	}

	return (
		<DataResolver
			data={data}
			isLoading={isLoading}
			isError={isError}
			error={error}
		>
			<AppContext.Provider value={contextValue}>
				<Layout />
			</AppContext.Provider>
		</DataResolver>
	);
};

const useAppProvider = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppProvider must be used within a LayoutProvider');
	}
	return context;
};

export default memo(LayoutProvider);
export { useAppProvider };
