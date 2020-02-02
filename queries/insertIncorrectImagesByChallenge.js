const db = require('../config/db/mysql').pool

//takes an array to insert all at once with a challengeId argument, returns a promise of the data
module.exports = (incorrectImages, challengeId) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO challenges_symbols_incorrect (image_id, challenge_id) VALUES ?;`
    const params = incorrectImages.map(image => {
      return [ image, challengeId ]
    });
    db.query(query, [params], (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}