import { get, ref as dbRef, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase/config';

export default class Api {
	static async getTimezones() {
		const teamRef = dbRef(db, `teamTimeZones/`);
		const teamSnapshot = await get(teamRef);
		const teamTimeZonesData = teamSnapshot.val();

		return Object.values(teamTimeZonesData || {}).map((preset) => preset);
	}

	static async addNewTeammate(newTeammate) {
		const id = uuidv4();
		const teamRef = dbRef(db, `teamTimeZones/${id}`);
		const body = {
			...newTeammate,
			id,
		};

		await set(teamRef, body);
		return newTeammate;
	}
}
