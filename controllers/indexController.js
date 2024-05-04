const indexView = function (req, res) {
    res.render("indexView", { title: "RecicleAqui" });
}

module.exports = {
    indexView
}