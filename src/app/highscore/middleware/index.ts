
import UserRepository from '../../user/repository';
import UserSchema from '../../user/model';
import AttributeSchema from '../../attribute/model';

export function findAllUsersAndGenerateHighscoreLists(req, res, next) {

    UserSchema.find({})
        .populate({
        path: 'attributes.attribute',
            select: '-__v'
        })
        .exec((err, users)=> {
            if(err) return res.status(500).send();
            if(!users) return res.status(404).send();

            var numOfElements = 10;
            if(req.query.count) {
                if (!isNaN(req.query.count)) numOfElements = req.query.count;
            }

            let highscores = {};
            let attributes = users[0].attributes;
            attributes.forEach( (object) => {
                highscores[object.attribute.name] = [];
            });

            users.forEach( (user) => {
                user.attributes.forEach( (object) => {
                    highscores[object.attribute.name].push({name: user.name, fbId: user.fbId, score: object.value});
                });
            });

            let finalHighscores = [];

            //Sorts each individual highscore list, and
            for (var key in highscores) {
                highscores[key].sort(function(a, b){return b.score -a.score});
                highscores[key] = highscores[key].slice(0,numOfElements);
                finalHighscores.push({attribute: key, scores: highscores[key]});
            }
            
            req.data.highscores = finalHighscores;
            next();
    });
}

export function returnSuccessResponseWithHighscores(req, res, next) {
    return res.status(200).json({highscores: req.data.highscores});
}






