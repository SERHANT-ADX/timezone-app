import TeammateSchedule from '../components/TeammateSchedule/TeammateSchedule';
import API from '../api/api';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { off, onValue, ref } from 'firebase/database';

const Layout = () => {
	const [teamList, setTeamList] = useState([]);

	const getTeammateList = async () => {
		const team = await API.getTimezones();
		setTeamList(team);
		return team;
	};

	const addNewTeammate = async (newTeammate) => {
		return await API.addNewTeammate(newTeammate);
	};

	useEffect(() => {
		if (!teamList?.length) {
			getTeammateList();
		}

		const teamListRef = ref(db, `teamTimeZones/`);
		const onDataChange = (snapshot) => {
			const data = snapshot.val();
			const teamList = Object.values(data || {});

			setTeamList(teamList || []);
		};

		onValue(teamListRef, onDataChange);

		return () => {
			off(teamListRef, onDataChange);
		};
	}, [setTeamList]);

	return (
		<TeammateSchedule
			teamList={teamList}
			addNewTeammate={addNewTeammate}
		/>
	);
};

export default Layout;
