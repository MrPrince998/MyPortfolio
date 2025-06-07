const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const checkTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or invalid" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjgzYjE3MDRhNWMwNzgwODE4MWY4YmYwIiwiZW1haWwiOiJwZWluY2VyYW5hMjM0QGdtYWlsLmNvbSIsImlhdCI6MTc0ODcwNDIxOSwiZXhwIjoxNzQ4NzA3ODE5fQ.jkqXZLzStwXfzFsG6tNsCe9BahLbahJYcquOUoSqGWo
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjgzYjE3MDRhNWMwNzgwODE4MWY4YmYwIiwiZW1haWwiOiJwZWluY2VyYW5hMjM0QGdtYWlsLmNvbSIsImlhdCI6MTc0ODcwNDIxOSwiZXhwIjoxNzQ4NzA3ODE5fQ.jkqXZLzStwXfzFsG6tNsCe9BahLbahJYcquOUoSqGWo
module.exports = checkTokenMiddleware;
