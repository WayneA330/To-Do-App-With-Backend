require("dotenv-flow").config({ silent: true });
// const { router } = require("./utils/routes.imports.utils");
const express = require("express");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const bearerStrategy = require("./middlewares/BearerStrategy");
const readRecursively = require("./utils/readRecursively");
const path = require("path");
const routes = require("./routes/api_routes");

const router = express();

passport.use(bearerStrategy());
const PORT = process.env.PORT;

router.use(
  logger(
    ":method :url => Status: :status, Content length: :res[content-length], Time: :response-time ms "
  )
);

router.use(cors());
router.use(compression());
router.use(express.json({ limit: "50mb" }));
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

try {
  readRecursively("./routes").then((result) => {
    result.map(async (item) => {
      const reqPath = path.join(__dirname, "/");
      const file = require(`${reqPath}${item}`);
      router.use(file._router);
    });
  });
} catch (err) {
  // eslint-disable-next-line
  console.error({ err });
}

//helmet middleware
router.use(helmet());

routes(router);

router.listen(PORT, () =>
  // eslint-disable-next-line
  console.log(`Running on ${PORT}`)
);

module.exports = router;
