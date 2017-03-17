import { IUser, UserSchema } from './model';

export class UserRepository {
	constructor() {
	}

	/**
	 * Finds a specified user
	 * @param {string} id - id of the user
	 * @param {Function} completion - Function that will execute after the query, called completion(err, user)
	 */
	public findById(id: string, completion: Function): void {
		UserSchema.findById(id).exec()
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
		let newUser = new UserSchema(user);
		newUser.save().exec()
			.then((savedUser) => {
				completion();
			})
			.catch((err) => {
				completion(err);
			});
	}
}