import ActivityRepository from '../repository'


export function findAllActivities(req, res, next) {
    ActivityRepository.findAll((err, activities) => {
        if (err) return res.status(500).send();
        if (!activities) return res.status(404).send();
        else  {
            req.data.activities = activities;
            next(null);
        }
    });
}

export function returnSuccessWithActivities(req, res, next) {
    let activities = req.data.activities;
    return res.status(200).json({activities: activities});
}




