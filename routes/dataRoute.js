const express = require('express');
const router = express.Router();
const axios = require('axios')
const User = require('../models/User');

router.post('/get', async (req, res) => {
    console.log(req.body);
    User.findById(req.body.userid)
      .then(resp => { 
        console.log(resp);
        const access_token = resp.access_token;  
        axios.get('https://www.strava.com/api/v3/athlete/activities', { 
            headers: { Authorization: `Bearer ${access_token}` }
        })
          .then(stravaResp => { 
            console.log(stravaResp.data); 
            res.send(stravaResp.data);
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
});


module.exports = router;


// 1ca8e1293c1f50e94a87d354f1f7e03e94452a6f
// a9190944e5769a1e7d33ddb9b15d99eb1b900b2f