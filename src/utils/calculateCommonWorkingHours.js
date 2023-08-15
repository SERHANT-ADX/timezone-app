import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function calculateCommonWorkingHoursList(teammates, userTimezoneOffset) {
	const teammatesTime = teammates.map((teammate) => {
		return dayjs.tz(teammate.time, 'America/New_York').utcOffset(userTimezoneOffset);
	});

	return teammatesTime;
}
