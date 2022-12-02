const { Router } = require('express');
const { Country, Activity } = require('../db');

const router = Router();

router.get("/activities", async(req, res) => {
  const allActivities = await Activity.findAll({ include: Country });
  //filtro para el fron que trae todas las actividades
  const filterA = allActivities.map(a => a.name.toLowerCase())
  const total = filterA.filter((item, index)=> {
    return filterA.indexOf(item) === index;
  })
  res.json(total)
});

router.post('/activities', async(req, res, next) => {
  const { name, difficulty, duration, season, countries } = req.body;
  try {
    let newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season
})
    await newActivity.setCountries(countries)

    let activityWithCountry = await Activity.findOne({
      where: { name: name 
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: {
        model: Country,
        through: {
          attributes: []
      }
    }
  })
  res.json(activityWithCountry)
  } catch (error) {
    next(error)
  }
});

module.exports = router;





