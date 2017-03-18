import UserRepository from '../user/repository';
import { IUser } from '../user/model';

export default class AttributeRepository {
	constructor() {
	}

	/**
	 * Finds a specified user
	 * @param {string} id - id of the user
	 * @param {Function} completion - Function that will execute after the query, called completion(err, user)
	 */
	public static findById(id: string, completion: Function): void {
	
	}

	/**
	 * Finds a specified user
	 * @param {string} id - id of the user
	 * @param {Function} completion - Function that will execute after the query, called completion(err, user)
	 */
	public static findByFbId(fbId: string, completion: Function): void {
		
	}

	/**
	 * Finds a specified user
	 * @param {IUser} user - user object to save
	 * @param {Function} completion - Function that will execute after the query, called completion(err, user)
	 */
	public static create(user: IUser, completion: Function): void {
		
	}
}