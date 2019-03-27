const mainRoute = (req, res) => {
    res.set("Content-Type", "text/html");
    res.send("<h1>Привет!</h1>");
};

module.exports = mainRoute;