
import UserRepository from '../../user/repository';
import RankRepository from '../repository'
import UserSchema from '../../user/model';
import * as PushNotifications from '../../../lib/push_notiication';

export function findAllRanks(req, res, next) {
    RankRepository.findAll( (err, ranks) => {
        if (err) {
            return res.status(500).send();
        }

        req.data.ranks = ranks;
        return next();

    });
}

export function returnSuccessResponseWithRanks(req, res, next) {
        return res.json(
            {ranks: req.data.ranks}
        );
}

export function sendNewRankPushNotification (req, res, next) {

    let attribute = req.data.rank;
    
    let push: PushNotifications.PushNotification = {
        payload: {
            event: 'added',
            entity: 'rank'
        },
        provider: 'gcm'
    }
    UserRepository.getAllPushTokens( (err, tokens) => {
        if (err) {
            return res.status(500).send("could not get pushtokens");
        }
        PushNotifications.sendPushNotification(tokens, push).then( (response) => {
            console.log(response);
            return next();
        }).catch( (err) => {
            console.log(err);
            return res.status(500).send("could not send push");
        });
    });
}

export function createRank(req, res, next) {
    let userId = req.data.decodedToken.userId;
    let rank = req.body.rank;
    RankRepository.create(userId, rank, (err, newRank) => {
        if (err == "401") return res.status(401).json({message: "You have to be admin to perform this action."});
        if (err) return res.status(500).send();
        else {
            req.data.rank = newRank;
            return next();
        }
    });
}

export function deleteRank(req, res, next) {
    let userId = req.data.decodedToken.userId;
    let rankId = req.params.id;
    RankRepository.delete(userId, rankId, (err, deletedRank) => {
        if (err == "403") return res.status(403).json({message: "You have to be admin to perform this action."});
        if (!deletedRank) return res.status(404).json({message: "Rank not found."});
        req.data.deletedRank = deletedRank;
        next();
    });
}

export function returnSuccessResponseWithDeletedRank(req, res, next) {
    let deletedRank = req.data.deletedRank;
    return res.status(200).json({rank: deletedRank});
}

export function returnSuccessResponseWithCreatedRank(req, res, next) {
    let rank = req.data.rank;
    return res.status(200).json({rank: rank});
}




