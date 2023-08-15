import { useState } from 'react';
import { Box, Button, Input, Modal } from '@mui/material';

const SetNameModal = ({ showSetNameModal, setShowSetNameModal, setUserName }) => {
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = () => {
		setUserName(name);
		setShowSetNameModal(false);
		localStorage.setItem('userName', inputValue);
	};

	return (
		<Modal
			open={showSetNameModal}
			onClose={setShowSetNameModal}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
					gap: '20px',
					height: 'fit-content',
					width: '300px',
					background: 'white',
					position: 'fixed',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					borderRadius: '10px',
					padding: '20px',
				}}
			>
				<h3>Set Name</h3>
				<Input
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Enter your name"
					type="text"
				/>
				<Button
					variant="contained"
					onClick={() => handleSubmit()}
				>
					Submit
				</Button>
			</Box>
		</Modal>
	);
};

export default SetNameModal;
