let states = null;

module.exports = async function(req, res) {
  // only query states from database once
  if(!states) {
    try {
      states = await queryStates();
    }
    catch(err){
      console.log("Error querying states.", err.stack);
      return res.render("internal_error");
    }
  }

  return res.json(states);
}

async function queryStates() {
  const client = await global.pool.connect();
  console.log("querying states");
  results = await client.query("SELECT * FROM state");
  client.release();
  console.log("done querying states");
  return results.rows;
}

