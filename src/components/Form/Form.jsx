import React, { useState } from 'react';
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';

const Form = ({ handleAddNewPerson, isUpdating, title, allTimeZonesArray }) => {
	const [value, setValue] = useState(allTimeZonesArray[0]);
	const [inputValue, setInputValue] = React.useState('');

	const [name, setName] = React.useState('');
	const [startTime, setStartTime] = React.useState('');
	const [endTime, setEndTime] = React.useState('');

	const handleSubmit = () => {
		const body = {
			name: name || 'Temp name',
			timezone: value || 'Europe/London',
			startWorkingHours: Math.round(parseFloat(startTime)) || '9',
			endWorkingHours: Math.round(parseFloat(endTime)) || '18',
		};
		handleAddNewPerson(body, isUpdating);
	};

	return (
		<Box sx={{ marginTop: '20px' }}>
			<Typography
				sx={{ marginBottom: '20px' }}
				variant="h4"
			>
				{title}
			</Typography>
			<Autocomplete
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				id="controllable-states-timezone-update"
				options={allTimeZonesArray}
				sx={{ width: 300 }}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Timezone"
					/>
				)}
			/>
			<Box
				sx={{
					width: 400,
					display: 'flex',
					flexDirection: 'column',
					gap: '15px',
					marginTop: '20px',
				}}
			>
				<TextField
					variant="outlined"
					label="Your name"
					placeholder="Put the same name that you have"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<TextField
					id="startTime"
					label="Start Time"
					variant="outlined"
					value={startTime}
					placeholder="Put when you start working, range 0-24"
					onChange={(e) => {
						setStartTime(e.target.value);
					}}
				/>
				<TextField
					id="endTime"
					label="End Time"
					variant="outlined"
					placeholder="Put when you end working, range 0-24"
					value={endTime}
					onChange={(e) => {
						setEndTime(e.target.value);
					}}
				/>
			</Box>
			<Button
				onClick={handleSubmit}
				sx={{
					marginTop: '15px',
					borderRadius: '4px',
					background: '#7F77F1 !important',
					display: 'flex',
					padding: '9px 13px',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '10px',
					color: '#FFF',
					fontFamily: 'Inter',
					fontSize: '12px',
					fontStyle: 'normal',
					fontWeight: 600,
					lineHeight: 'normal',
				}}
			>
				{isUpdating ? 'Update info' : 'Add teammate'}
			</Button>
		</Box>
	);
};

export default Form;
