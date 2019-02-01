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
      birthdate: post.birthdate,
      gender: post.gender_specify ? post.gender_specify : post.gender,
      race: post.race_specify ? post.race_specify : post.race,
      major: post.major,
      los: post.los,
      graduation: post.graduation,
      country: post.country,
      state: post.state,
      ieee_member_id: post.ieee_member_id ? post.ieee_member_id : null,
      resume: files.resume ? files.resume.data : null,
      shirt_size: post.shirt_size,
      accepted_student: post.accepted_student === 'Yes',
      accepted_student_half_full: post.accepted_student === 'Yes' ? post.accepted_student_half_full : null,
      dietary_restrictions: post.dietary_restrictions,
      minor: post.minor ? true : false,
      first_timer: post.first_timer ? true: false,
      mlh_coc: post.mlh_coc ? true : false,
      mlh_ctac_pp: post.mlh_ctac_pp ? true : false,
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
    text: `INSERT INTO hacker (first_name, last_name, phone, email, school, birthdate, gender, race, major, los, graduation, country, state, ieee_member_id, resume, shirt_size, accepted_student, accepted_student_half_full, dietary_restrictions, minor, first_timer, mlh_coc, mlh_ctac_pp)
VALUES(
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9,
    $10,
    $11,
    $12,
    $13,
    $14,
    $15,
    $16,
    $17,
    $18,
    $19,
    $20,
    $21,
    $22,
    $23
    )`,
    values: [
      hacker.first_name,
      hacker.last_name,
      hacker.phone,
      hacker.email,
      hacker.school,
      hacker.birthdate,
      hacker.gender,
      hacker.race,
      hacker.major,
      hacker.los,
      hacker.graduation,
      hacker.country,
      hacker.state,
      hacker.ieee_member_id,
      hacker.resume,
      hacker.shirt_size,
      hacker.accepted_student,
      hacker.accepted_student_half_full,
      hacker.dietary_restrictions,
      hacker.minor,
      hacker.first_timer,
      hacker.mlh_coc,
      hacker.mlh_ctac_pp,
    ]
  };

  console.log(sql)
  await client.query(sql);
  await client.release();
}
