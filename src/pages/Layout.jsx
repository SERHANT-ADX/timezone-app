import Container from '@mui/material/Container';
import CreateProfileModal from '../components/CreateProfileModal/CreateProfileModal';
import TeammateSchedule from '../components/TeammateSchedule/TeammateSchedule';
import { useAppProvider } from './LayoutProvider';
import SetNameModal from '../components/SetNameModal/SetNameModal';

const Layout = () => {
	const {
		showCreateProfileModal,
		setShowCreateProfileModal,
		teammatesList,
		isLoading,
		isError,
		error,
		showSetNameModal,
		setShowSetNameModal,
		setUserName,
		userName,
		userTimezoneOffset,
		createNewTeammate,
	} = useAppProvider();

	return (
		<>
			<SetNameModal
				showSetNameModal={showSetNameModal}
				setShowSetNameModal={setShowSetNameModal}
				setUserName={setUserName}
			/>
			<Container
				maxWidth="100vw"
				disableGutters={true}
				sx={{ backgroundColor: '#fff', height: '100vh' }}
			>
				<CreateProfileModal
					showCreateProfileModal={showCreateProfileModal}
					setShowCreateProfileModal={setShowCreateProfileModal}
					createNewTeammate={createNewTeammate}
				/>
				<TeammateSchedule
					teammatesList={teammatesList}
					userTimezoneOffset={userTimezoneOffset}
					userName={userName}
				/>
				{/*<TeamCommonTime teamList={teammatesList} userName={userName}/>*/}
			</Container>
		</>
	);
};

export default Layout;
