import React, { useState } from 'react';
import { Autocomplete, Avatar, Box, Button, TextField, Typography } from '@mui/material';

var allTimeZones = {};
var allTimeZonesArray = [];

allTimeZones = Intl.supportedValuesOf('timeZone');
Object.keys(allTimeZones).forEach(function (key) {
	allTimeZonesArray.push(allTimeZones[key]);
});

const timeFormatOptions = { hour12: false, hour: 'numeric', minute: 'numeric' };

const TeammateSchedule = ({ teamList, addNewTeammate }) => {
	const scaleTimeList = Array.from({ length: 25 }, (_, index) => index);
	const evenList = scaleTimeList.filter((scaleTime) => scaleTime % 2 === 0);

	const formatter = new Intl.DateTimeFormat('en-US', {
		...timeFormatOptions,
		timeZone: 'Europe/Jersey',
	});

	const londonTime = formatter.format(new Date()).toString();
	const [hours, minutes] = londonTime.split(':').map(Number);
	const leftOffsetGlobal = ((hours * 60 + minutes) * 100) / (24 * 60);

	const [name, setName] = useState('');

	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');

	const [value, setValue] = useState(allTimeZonesArray[0]);
	const [inputValue, setInputValue] = useState('');

	const handleAddNewPerson = async () => {
		const body = {
			name: name,
			timezone: value,
			startWorkingHours: startTime,
			endWorkingHours: endTime,
		};
		await addNewTeammate(body);
	};

	return (
		<Box
			sx={{
				padding: '36px 38px',
				margin: 'auto 0',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-start',
				alignItems: 'flex-end',
				background: '#2A2E34',
			}}
		>
			<Box sx={{ padding: '1rem', background: '#2A2E34', width: '100%' }}>
				<Box
					sx={{
						paddingLeft: '310px',
						display: 'flex',
						width: '100%',
						gap: '25px',
						marginTop: '20px',
						position: 'relative',
					}}
				>
					{evenList.map((scaleTime) => (
						<Box
							key={scaleTime}
							sx={{
								textAlign: 'center',
								width: '7.69%',
								height: '10px',
								color: '#5F6672',
								fontSize: '8px',
								fontStyle: 'normal',
								fontWeight: '500',
								lineHeight: 'normal',
							}}
						>
							{scaleTime < 10 ? `0${scaleTime}:00` : `${scaleTime}:00`}
						</Box>
					))}
				</Box>
				<Box
					sx={{
						marginTop: '10px',
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-end',
						alignItems: 'flex-start',
						gap: '20px',
						padding: '20px 10px',
					}}
				>
					{(teamList || []).map((teammate) => {
						const formatter = new Intl.DateTimeFormat('en-US', {
							...timeFormatOptions,
							timeZone: teammate.timezone,
						});
						const memberLocalTime = teammate.timezone + ' ' + formatter.format(new Date());

						const nowInTargetTimezone = formatter.format(new Date()).toString();
						const [localHours, localMinutes] = nowInTargetTimezone.split(':').map(Number);

						const leftOffsetForMember = ((localHours * 60 + localMinutes) * 100) / (24 * 60);

						return (
							<Box
								key={teammate.name}
								sx={{
									marginTop: '34px',
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									gap: '60px',
								}}
							>
								<Box
									sx={{
										width: 'max-content',
										minWidth: '250px',
										display: 'flex',
										justifyContent: 'flex-start',
										alignItems: 'center',
										gap: '20px',
									}}
								>
									<Avatar />
									<Box sx={{ minWidth: '100%' }}>
										<Typography variant="body1">{teammate.name}</Typography>
										<Typography variant="body2">{memberLocalTime}</Typography>
									</Box>
								</Box>
								<Box
									sx={{
										display: 'flex',
										width: '100%',
										borderRadius: '10px',
										background: '#49505B',
										height: '6px',
										position: 'relative',
									}}
								>
									{scaleTimeList.map((scaleTime) => {
										const timeDifference = localHours - new Date().getUTCHours();

										const adjustedStartWorkingHours = +teammate.startWorkingHours + +timeDifference;
										const adjustedEndWorkingHours = +teammate.endWorkingHours + +timeDifference;

										const adjustedScaleTimeStart = +scaleTime + timeDifference;
										const adjustedScaleTimeEnd = +scaleTime + timeDifference;

										const betweenStartAndEnd =
											adjustedScaleTimeStart >= Math.floor(adjustedStartWorkingHours) &&
											adjustedScaleTimeEnd <= Math.ceil(adjustedEndWorkingHours);

										const betweenStartAndEndColor = betweenStartAndEnd ? '#4B882E' : 'inherit';

										return (
											<Box
												key={scaleTime}
												sx={{
													width: '4.16%',
													height: '100%',
													background: betweenStartAndEndColor,
												}}
											/>
										);
									})}
									<Box
										sx={{
											position: 'absolute',
											top: '-50px',
											left: leftOffsetForMember + '%',
											zIndex: 10,
											transform: 'translateX(-50%)',
											borderRadius: '4px',
											background: '#3D424A',
											display: 'flex',
											padding: '7px 12px',
											justifyContent: 'center',
											alignItems: 'center',
											gap: '10px',
											color: '#FFF',
											fontSize: '12px',
										}}
									>
										{`${localHours}:${localMinutes < 10 ? '0' + localMinutes : localMinutes} ${
											localHours >= 12 ? 'PM' : 'AM'
										}`}
									</Box>
									<Box
										id={'timeline' + teammate.name}
										sx={{
											width: '0px',
											height: '50px',
											borderLeft: '1px dashed #49505B',
											position: 'absolute',
											top: '-50px',
											left: leftOffsetForMember + '%',
										}}
									/>
									<Box
										sx={{
											position: 'absolute',
											top: '-4px',
											left: leftOffsetForMember + '%',
											zIndex: 10,
											width: '14px',
											height: '14px',
											transform: 'translateX(-50%)',
											borderRadius: '50%',
											border: '3px solid #2A2E34',
											background: '#868E9D',
										}}
									/>
								</Box>
							</Box>
						);
					})}
				</Box>
				<Box
					sx={{
						marginTop: '15px',
					}}
				>
					<Autocomplete
						value={value}
						onChange={(event, newValue) => {
							setValue(newValue);
						}}
						inputValue={inputValue}
						onInputChange={(event, newInputValue) => {
							setInputValue(newInputValue);
						}}
						id="controllable-states-timezone"
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
							placeholder="Your name"
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
						onClick={handleAddNewPerson}
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
						Add timezone
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default TeammateSchedule;
