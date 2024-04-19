const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Authorization token required and must be a Bearer token" });
    }

    const token = authorization.split(" ")[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        req.user = await User.findById(_id).select("_id");

        if (!req.user) {
            return res.status(404).json({ error: "User not found" });
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Request is not authorized" });
    }
};

module.exports = requireAuth;