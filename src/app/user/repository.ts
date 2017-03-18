import User from './model';
import { IUser } from './model';

export default class UserRepository {
	constructor() {
	}

	private static defaultPopulateQuery = {
		path: 'performedActivities attributes.key',
		select: '-__v -_id'
	}

	/**
	 * Finds a specified user
	 * @param {string} id - id of the user
	 * @param {Function} completion - (OPTIONAL) Function that will execute after the query, called completion(err, user)
	 */
	public static findById(id: string, completion?: Function): void {
		return User.findById(id).exec(completion);
	}

	/**
	 * Finds a specified user
	 * @param {string} id - id of the user
	 * @param {Function} completion - (OPTIONAL) Function that will execute after the query, called completion(err, user)
	 */
	public static findByIdAndPopulate(id: string, populateQuery: any, completion?: Function): void {
		let query = populateQuery;
		if (!populateQuery) {
			query = UserRepository.defaultPopulateQuery;
		}
		return User.findById(id).populate(query).exec(completion);
	}

	/**
	 * Finds a specified user
	 * @param {string} id - id of the user
	 * @param {Function} completion - (OPTIONAL) Function that will execute after the query, called completion(err, user)
	 */
	public static findByFbId(fbId: string, completion?: Function): void {
		return User.findOne({fbId: fbId}).exec(completion);
	}

	/**
	 * Finds a specified user
	 * @param {IUser} user - user object to save
	 * @param {Function} completion - (OPTIONAL) Function that will execute after the query, called completion(err, user)
	 */
	public static create(user: IUser, completion?: Function): void {
		let newUser = new User(user);
		newUser.isAdmin = true;
		return newUser.save(completion);
	}
}