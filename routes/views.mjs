import PublicController from "../controllers/publicController.mjs";

export default function (app) {
  app.get('/', PublicController.index);
};
