const loginView = (req, res) => {
    res.render("loginView", { title: "RecicleAqui - Login" });
}

module.exports = {
    loginView
}