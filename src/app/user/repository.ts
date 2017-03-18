import User from './model';
import { IUser } from './model';

export default class UserRepository {
	constructor() {
	}

	/**
	 * Finds a specified user
	 * @param {string} id - id of the user
	 * @param {Function} completion - Function that will execute after the query, called completion(err, user)
	 */
	public findById(id: string, completion: Function): void {
		User.findById(id).exec()
			.then((user) => {
				completion(null, user);
			})
			.catch((err) => {
				completion(err);
			});
	}

	/**
	 * Finds a specified user
	 * @param {string} id - id of the user
	 * @param {Function} completion - Function that will execute after the query, called completion(err, user)
	 */
	public findByFbId(fbId: string, completion: Function): void {
		User.findOne({fbId: fbId}).exec()
			.then((user) => {
				completion(null, user);
			})
			.catch((err) => {
				completion(err);
			});
	}

	/**
	 * Finds a specified user
	 * @param {IUser} user - user object to save
	 * @param {Function} completion - Function that will execute after the query, called completion(err, user)
	 */
	public create(user: IUser, completion: Function): void {
		let newUser = new User(user);
		newUser.save()
			.then((savedUser) => {
				completion(null, savedUser);
			})
			.catch((err) => {
				completion(err);
			});
	}
}