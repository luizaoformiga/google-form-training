import { Router } from "express";
import { FormControllers } from "@/app/controllers";

const FormRouter = Router();
const route = new FormControllers();

FormRouter.post("/create", route.createForm);
FormRouter.get("/forms", route.formsGet);
FormRouter.get("/form/:formId", route.getFormById);
FormRouter.delete("/deleteform/:formId/:userId", route.deleteForm);
FormRouter.put("/editform", route.editForm);
FormRouter.get("/getuserforms/:userId", route.getAllFormsOfUser);

export default FormRouter;
