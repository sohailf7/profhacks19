module.exports = async function(req, res) {
  if(req.method === "GET") {
    res.render("register");
  }

  if(req.method === "POST") {
    const post = req.body;
    const files = req.files;
    console.log(files);
    const hacker = {
      first_name: post.first_name,
      last_name: post.last_name,
      phone: post.phone,
      email: post.email,
      school: post.school,
      country: post.country,
      state: post.state,
      minor: post.minor ? true : false,
      first_timer: post.first_timer ? true: false,
      resume: files,
      ieee_student_member: post.ieee_student_member ? true : false,
      ieee_member_id: post.ieee_member_id ? post.ieee_member_id : null,
      mlh_coc: post.mlh_coc ? true : false,
      mlh_dsn: post.mlh_dsn ? true : false,
    };
    try {
      await registerHacker(hacker);
    }
    catch(err){
      console.log("Hacker registration failed!", err.stack);
      return global.routes.internal_error(req, res);
    }
    return res.render("register",{message: "Thank You for Registering"})
  }
}

async function registerHacker(hacker) {
  const client = await global.pool.connect();
  console.log(`Registering Hacker ${hacker.first_name} ${hacker.last_name}`);
  const sql = {
    text: `INSERT INTO hacker (first_name, last_name, phone, email, school, country, state, minor, first_timer, resume, ieee_student_member, ieee_member_id, mlh_coc, mlh_dsn)
    VALUES                     ($1,         $2,        $3,    $4,    $5,     $6,         $7,       $8,    $9,          $10,    $11,                 $12,            $13,     $14)`,
    values: [
      hacker.first_name,
      hacker.last_name,
      hacker.phone,
      hacker.email,
      hacker.school,
      hacker.country,
      hacker.state,
      hacker.minor,
      hacker.first_timer,
      hacker.resume,
      hacker.ieee_student_member,
      hacker.ieee_member_id,
      hacker.mlh_coc,
      hacker.mlh_dsn,
    ]
  };

  console.log(sql)
  await client.query(sql);
}
