import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function getTimezoneDifferenceMessage(targetTimezone) {
	const userLocalTime = dayjs().tz(dayjs.tz.guess(), true);
	const targetLocalTime = dayjs().tz(targetTimezone, true);

	const differenceHours = targetLocalTime.diff(userLocalTime, 'hour');
	const absoluteDifferenceHours = Math.abs(differenceHours);

	let timezoneDiffMsg = '';
	if (differenceHours === 0) {
		timezoneDiffMsg = 'Your time zone matches';
	} else if (differenceHours > 0) {
		timezoneDiffMsg = `Your time zone is ${absoluteDifferenceHours} h ahead`;
	} else {
		timezoneDiffMsg = `Your time zone is ${absoluteDifferenceHours} h behind`;
	}

	return timezoneDiffMsg;
}
