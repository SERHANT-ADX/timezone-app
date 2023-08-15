import { Button, Container, Modal, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const CreateProfileModal = ({ showCreateProfileModal = false, setShowCreateProfileModal, createNewTeammate }) => {
	const validationSchema = yup.object({
		name: yup.string().required('Name is required'),
		email: yup.string().email('Invalid email').required('Email is required'),
		position: yup.string().required('Position is required'),
		timezone: yup.string().required('Timezone is required'),
		startWorkingHours: yup.number().required('Start working hours is required'),
		endWorkingHours: yup.number().required('End working hours is required'),
	});

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			position: '',
			timezone: '',
			startWorkingHours: '',
			endWorkingHours: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				const newTeammate = {
					...values,
					timezone: new Date().getTimezoneOffset(),
					id: uuidv4(),
				};
				const response = await createNewTeammate.mutate(newTeammate);
				console.log('response', response);
				return response.data;
			} catch (error) {
				console.error('Error:', error);
			}
		},
	});

	return (
		<Modal
			open={showCreateProfileModal}
			onClose={() => setShowCreateProfileModal(false)}
		>
			<Container
				maxWidth="sm"
				sx={{
					height: '80%',
					background: 'white',
					width: '90%',
					padding: '10px',
					position: 'fixed',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<Typography
						variant="h4"
						gutterBottom
					>
						Add Teammate
					</Typography>
					<form onSubmit={formik.handleSubmit}>
						<TextField
							label="Name"
							variant="outlined"
							fullWidth
							margin="normal"
							{...formik.getFieldProps('name')}
						/>
						<TimePicker
							label="Start Working Hours"
							value={formik.values.startWorkingHours}
							onChange={(value) => formik.setFieldValue('startWorkingHours', value)}
							renderInput={(params) => <TextField {...params} />}
						/>
						<TimePicker
							label="End Working Hours"
							value={formik.values.endWorkingHours}
							onChange={(value) => formik.setFieldValue('endWorkingHours', value)}
							renderInput={(params) => <TextField {...params} />}
						/>
						<Button
							type="submit"
							variant="contained"
							color="primary"
						>
							Submit
						</Button>
					</form>
				</LocalizationProvider>
			</Container>
		</Modal>
	);
};

export default CreateProfileModal;
