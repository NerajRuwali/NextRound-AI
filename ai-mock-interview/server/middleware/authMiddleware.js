import jwt from "jsonwebtoken";

export function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Missing or invalid Authorization header.",
      });
    }

    const secret = process.env.JWT_SECRET || "dev_secret_change_me";
    const decoded = jwt.verify(token, secret);

    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Invalid token.",
      });
    }

    req.user = { id: decoded.id };
    return next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Token verification failed.",
    });
  }
}

