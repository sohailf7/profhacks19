let countries = null;

module.exports = async function(req, res) {
  // only query countries from database once
  if(!countries) {
    try {
      countries = await queryCountries();
    }
    catch(err){
      console.log("Error querying countries.", err.stack);
      return global.routes.internal_error(req, res);
    }
  }

  return res.json(countries);
}

async function queryCountries() {
  const client = await global.pool.connect();
  console.log("querying countries");
  results = await client.query("SELECT * FROM country");
  client.release();
  console.log("done querying countries");
  return results.rows;
}
