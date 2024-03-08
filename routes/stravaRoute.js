const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const axios = require('axios')
const User = require('../models/User');

router.post('/setInitialToken', async (req, res) => {
  let update  = { strava_token: req.body.token }
  let tokens;
  
  User.findOneAndUpdate({_id: req.body.id}, update, {new: true})
    .then(() => {
      let stravaData = {
        client_id: process.env.STRAVA_CLIENTID,
        client_secret: process.env.STRAVA_CLIENTSECRET,
        code: req.body.token, 
        grant_type: 'authorization_code',
      }
      // axios.post('https://www.strava.com/oauth/token', stravaData)
      //   .then( resp =>  { 
      //     console.log(resp); 
      //     tokens = { 
      //       token_type: resp.data.token_type,
      //       expires_at: resp.data.expires_at,
      //       expires_in: resp.data.expires_in,
      //       refresh_token: resp.data.refresh_token,
      //       access_token: resp.data.access.token
      //     }
        

      //   })
      // .catch( error => console.log(error))

        tokens = { 
          token_type: "Bearer",
          expires_at: 1709915230,
          expires_in: 21600,
          refresh_token: 'a9190944e5769a1e7d33ddb9b15d99eb1b900b2f',
          access_token: '1ca8e1293c1f50e94a87d354f1f7e03e94452a6f'
        }
        axios.post('http://localhost:8080/api/v1/strava/setToken', { tokens: tokens, id: req.body.id })
          .then(resp => { console.log(resp); res.send(resp) })
          .catch(error => console.log(error))
      })
    
      .catch((error) => { console.log(error)})

    // res.send(tokens) 
});

router.post('/setToken', async (req, res) => {
  console.log(req.body)
  let update = {
    access_token: req.body.tokens.access_token,
    refresh_token: req.body.tokens.refresh_token,
  }
  User.findOneAndUpdate({_id: req.body.id}, update, {new: true})
    .then(resp => { console.log(resp); res.send(resp); })
    .catch(error => console.log(error))
})



module.exports = router;


// 1ca8e1293c1f50e94a87d354f1f7e03e94452a6f
// a9190944e5769a1e7d33ddb9b15d99eb1b900b2f