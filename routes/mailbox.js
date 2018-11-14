module.exports = async function(req, res) {
  if(req.method === "POST") {
    const post = req.body
    console.log(post);
    try {
      const client = await global.pool.connect();
      const api_key = process.env.MAILGUN_API_KEY;
      asserMailValid(api_key, `${post.timestamp}${post.token}`,"sha256");
    }
    catch(err){
      console.log(err.stack);
      return res.render("internal_error");
    }
    res.status(200);
    return res.end();
  }
  else {
    return res.render("internal_error");
  }
}

function asserMailValid(api_key, msg, digestMod){
  const hmac = crypto.createHmac(digestMod, msg);
  console.log(hmac.toString('hex'));
  console.log(api_key);
}
