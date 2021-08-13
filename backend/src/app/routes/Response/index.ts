import { Router } from "express";
import { ResponseControllers } from "@/app/controllers";

const ResponseRouter = Router();
const route = new ResponseControllers();

ResponseRouter.post("/addresponse", route.submitResponse);
ResponseRouter.get("/responses", route.allResponses);

ResponseRouter.get("/getresponse/:formId", route.getResponse);

export default ResponseRouter;
