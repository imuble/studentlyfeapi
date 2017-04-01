import UserRepository from '../user/repository';
import Rank from './model';
import { IRank } from './model';


export default class RankRepository {
    constructor() {
    }

    /**
     * Finds all ranks
     * @param {Function} completion - Function that will execute after the query, called completion(err, attributes)
     */
    public static findAll(completion: Function): void {
        Rank.find({}).exec()
            .then( (ranks) => {
                return completion(null, ranks);
            })
            .catch( (err) => {
                return completion(err);
            });
    }

    public static create(userId: string, rank: IRank, completion: Function): void {
        UserRepository.isAdminAsync(userId, (isAdmin) => {
            if (!isAdmin) return completion("401");

            let newRank = new Rank(rank);
            newRank.save().then( (createdRank) => {
                return completion(null, createdRank);
            }).catch( (err) => {
                return completion(err);
            });

        });
    }

    public static delete(userId: string, rankId: string, completion: Function): void {
        UserRepository.isAdminAsync(userId, (admin) => {
            if (!admin) return completion("403");
            Rank.findByIdAndRemove(rankId, (err, deletedRank) => {
                if (err) completion("500");
                else if (!deletedRank)  completion("404");
                else completion(null, deletedRank);
            });
        });
    }
}
