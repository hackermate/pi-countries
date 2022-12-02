const { Router } = require('express');
const { Country, Activity } = require('../db');

const router = Router();

router.get("/countries", async(req, res) => {
  try{
    const { name } = req.query
    const allCountries = await Country.findAll({
      include: Activity
    })

    if(name){
      const byName = await allCountries.filter(i => i.name.toLowerCase().startsWith(name.toLowerCase()))
      byName.length > 0 ?
        res.json(byName) :
        res.status(404).send({'msg': 'Not found'})
    }else {
      res.json(allCountries)
    }
  }catch (error){
    console.log(error)
  }
});

router.get('/countries/:id', async(req, res, next) => {
  const { id } = req.params;
  let country

  try {
    if (id.length > 1){
      country = await Country.findByPk(id, { include: Activity })
      country = {
        id: country.id,
        name: country.name,
        image: country.flags,
        continent: country.continent,
        capital: country.capital,
        subregion: country.subregion,
        maps: country.maps,
        area: country.area,
        population: country.population,
        activities: country.activities.map(a => {
          return {
            id: a.id,
            name: a.name,
            difficulty: a.difficulty,
            duration: a.duration,
            season: a.season
          }
        })
      }
    } 
    res.json(country)
  } catch (error) {
    next(error)
  }
});



module.exports = router;