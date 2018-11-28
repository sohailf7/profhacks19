module.exports = async function(req, res){
  if(req.method === "GET") {
    res.render("home");
  }
  else if(req.method === "POST") {
    try{
      console.log("post in home");
      const post = req.body;
      const name = post.name;
      const email = post.email;
      const message = post.message;

      await uploadMessage(name, email, message);
      return res.render("contact_message", {message: "Thanks For Contacting Us!"});
    }
    catch(err){
      console.log(err, err.stack);
      return global.routes.internal_error(req, res);
    }
  }
  else
    return global.routes.page_not_found(req, res);
}

async function uploadMessage(name, email, message) {
  const client = await global.pool.connect();

  const sql = {
    text: "INSERT INTO message (name, email, message) VALUES ($1, $2, $3)",
    values: [name, email, message]
  }

  console.log(sql);
  const results = await client.query(sql);
  await client.release();
  return results
}
