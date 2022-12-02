import PublicController from "../controllers/publicController.mjs";
import ErrorHandler from "../errors/errorHandler.mjs";

export default function (app) {
  app.get('/', ErrorHandler.handleViewError(PublicController.index));
};
