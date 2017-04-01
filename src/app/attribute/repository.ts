import UserRepository from '../user/repository';
import { IUser } from '../user/model';
import { IAttribute } from './model';
import Attribute from './model';

export default class AttributeRepository {
	constructor() {
	}

    /**
	 * Finds all attributes
	 * @param {Function} completion - Function that will execute after the query, called completion(err, attributes)
	 */
    public static findAll(completion: Function): void {
        Attribute.find({}).exec()
        .then( (attributes) => {
            return completion(null, attributes);
        })
        .catch( (err) => {
            return completion(err);
        });
    }

    /**
	* Finds a specified user
	* @param {string} userId - id of user requesting to create a new attribute
    * @param {IAttribute}  - attribute to be created
	* @param {Function} completion - Function that will execute after the query, called completion(err, attribute)
	*/
    public static delete(userId: string, attributeId: string, completion: Function) {
        //Checks if the user has permission to create attribute

        UserRepository.isAdminAsync(userId, (isAdmin) => {
            if (!isAdmin) {
                completion(true);
            }

            Attribute.findById(attributeId, (err, attribute) => {
                if (err) {
                    console.log(err);
                    return completion(err);
                }

                attribute.remove( (err) => {
                    if (err) {
                        console.log(err);
                        return completion(err);
                    }

                    return completion(null);
                });
            });

        })
    }

	/**
	 * Finds a specified user
	 * @param {string} userId - id of user requesting to create a new attribute
     * @param {IAttribute} attribute - attribute to be created
	 * @param {Function} completion - Function that will execute after the query, called completion(err, attribute)
	 */
	public static create(userId: string, attribute: IAttribute, completion: Function): void {

        
        

		UserRepository.findById(userId, (err, user) => {
            
            if (err) {
                return completion(err);
            }

            if (!user || !user.isAdmin) {
                return completion(true);
            }
            
            let newAttribute = new Attribute(attribute);
            newAttribute.save()
            .then( (attr) => {
                return completion(null, attr);
            })
            .catch( (err) => {
                return completion(err);
            });
        });
	}
}