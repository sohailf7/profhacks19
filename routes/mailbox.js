module.exports = async function(req, res) {
  if(req.method === "POST") {
    const post = req.body
    console.log(post);
    res.end();
  }
  res.status(400);
  res.end();
}
