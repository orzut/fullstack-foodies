const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

router.get("/google", (req, res, next) => {
  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    include_granted_scopes: true,
    redirect_uri: "http://localhost:8080/auth/google/callback",
  });
  res.redirect(authUrl);
});

router.get("/google/callback", async (req, res, next) => {
  try {
    const { tokens } = await client.getToken({
      code: req.query.code,
      redirect_uri: "http://localhost:8080/auth/google/callback",
    });
    const login = await client.verifyIdToken({
      idToken: tokens.id_token,
    });
    const userId = login.getUserId().toString();
    const profile = login.getPayload();
    let user = await User.findOne({
      where: {
        email: profile.email,
        googleId: userId,
      },
    });

    if (!user) {
      user = await User.create({
        email: profile.email,
        firstName: profile.given_name,
        lastName: profile.family_name,
        username: profile.email,
        password: "123",
        googleId: userId,
      });
    }
    const token = require("jsonwebtoken").sign(
      { id: user.id },
      process.env.JWT
    );
    res.send(`
        <html>
          <head>
            <script>
              window.localStorage.setItem('token', '${token}');
              window.location = '/';
            </script>
          </head>
          <body>
          ...Signing In
          </body>
        </html>
      `);
  } catch (ex) {
    next(ex);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
