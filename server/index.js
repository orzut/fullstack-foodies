try {
  require("../.env");
} catch (ex) {
  console.log(ex);
}

const { db } = require("./db");
const PORT = process.env.PORT || 8080;
const app = require("./app");
const syncAndSeed = require("./db/seed");

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await syncAndSeed();
    } else {
      await db.sync();
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
