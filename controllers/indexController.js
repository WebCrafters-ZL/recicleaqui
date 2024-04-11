const indexView = function (req, res) {
    res.render("indexView", { title: "Demo do Bootstrap" });
}

module.exports = {
    indexView
}