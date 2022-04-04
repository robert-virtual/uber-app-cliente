exports.getMapa = (req, res) => {
  if(!req.session.userid){
    res.redirect('/login');
    return
  }
  res.render("mapa", {
    titulo: "Mapa",
  });
};
