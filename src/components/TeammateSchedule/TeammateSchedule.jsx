import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getTimezoneDifferenceMessage } from '../../utils/getTimezoneDifferenceMessage';

dayjs.extend(utc);
dayjs.extend(timezone);

const TeammateSchedule = ({ teammatesList = [], userTimezoneOffset }) => {
	return (
		<Container maxWidth="md">
			<Grid
				container
				direction="column"
				spacing={1}
				m={2}
			>
				<Grid
					item
					xs={6}
				>
					<Paper
						elevation={3}
						style={{ padding: '1rem' }}
					>
						<Typography variant="h2">Your Teammates&apos; Schedules</Typography>
						<Box
							sx={{
								marginTop: '20px',
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'flex-start',
								alignItems: 'flex-start',
								gap: '20px',
								padding: '20px 10px',
							}}
						>
							{teammatesList.map((teammate, index) => (
								<Box
									key={index}
									sx={{
										borderBottom: '1px solid gray',
										width: '100%',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'flex-start',
										alignItems: 'flex-start',
									}}
								>
									<Typography variant="body1">{teammate.name}</Typography>
									<Typography variant="body2">
										Local Time: {dayjs().utc().tz(teammate.timezone).format('lll').toString()}
									</Typography>
									<Typography variant="body2">{getTimezoneDifferenceMessage(teammate.timezone)}</Typography>
								</Box>
							))}
						</Box>
					</Paper>
				</Grid>
				<Grid
					item
					xs={6}
				>
					<Paper
						elevation={3}
						style={{ padding: '1rem' }}
					>
						<Typography variant="h5">Common Working Hours</Typography>
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(24, 1fr)' }}>
							{[...Array(24)].map((_, hour) => (
								<div key={hour}>
									<Typography variant="caption">{hour}</Typography>
								</div>
							))}
						</div>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};

export default TeammateSchedule;
