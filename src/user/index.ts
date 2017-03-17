import {UserRepository} from './repository';
import UserRoute from './route'

const UserFolder = {
	route: UserRoute,
	repository: UserRepository
};

export default UserFolder;