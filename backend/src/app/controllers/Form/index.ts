import { Request, Response } from "express";
import { FormModel, UserModel } from "@/app/models";

class FormControllers {
  async formsGet(req: Request, res: Response) {
    try {
      const result = await FormModel.find().lean();
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }

  async createForm(req: Request, res: Response) {
    try {
      const data = {
        createdBy: req.body.createdBy,
        name: req.body.name,
        description: req.body.description,
      };

      const newForm = new FormModel(data);
      await newForm.save().then((docs) => {
        UserModel.updateOne(
          { _id: data.createdBy },
          { $push: { createdForms: docs._id } }
        )
          .then(() => {
            console.log("Form id added to user deeatils");
          })
          .catch(() => console.log("got some error"));
        res.status(200).json(docs);
      });
    } catch (error) {
      res.send(error);
    }
  }

  async getFormById(req: Request, res: Response) {
    try {
      const formId = req.params.formId;

      await FormModel.findOne({ _id: formId }).then(async (form) => {
        if (form == null) {
          res.status(404).send("Form not found");
        } else {
          res.status(200).json(form);
        }
      });
    } catch (error) {
      res.send(error);
    }
  }

  async deleteForm(req: Request, res: Response) {
    try {
      const formId = req.params.formId;
      const userId = req.params.userId;

      console.log(formId);
      console.log(userId);

      await FormModel.findOne({ _id: formId }).then(async (form) => {
        console.log(form);
        if (form == null) {
          res.status(404).send("Form not found or already deleted");
        } else {
          if (form.createdBy === userId) {
            form.remove(function (err) {
              if (err) {
                return res.status(500).send(err);
              }
              console.log("Form deleted");
              return res.status(202).send("Form Deleted");
            });
          } else {
            res.status(401).send("You are not the owner of this Form");
          }
        }
      });
    } catch (error) {}
  }

  async editForm(req: Request, res: Response) {
    try {
      const formId = req.body.formId;
      const data = {
        name: req.body.name,
        description: req.body.description,
        questions: req.body.questions,
      };

      console.log("Hi, I am from backend, this is form data that i recivied");

      console.log(data);

      FormModel.findByIdAndUpdate(formId, data, { new: true }, (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json(result);
        }
      });
    } catch (error) {
      res.send(error);
    }
  }

  async getAllFormsOfUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      console.log(userId);

      await UserModel.findOne({ _id: userId }).then(async (user) => {
        if (user == null) {
          res.status(404).send("User not found");
        } else {
          FormModel.find()
            .where("_id")
            .in(user.createdForms)
            .exec((err, records) => {
              console.log(records);

              res.status(200).json(records);
            });
        }

        //   res.send(docs.createdForms)
      });
    } catch (error) {
      res.send(error);
    }
  }
}

export default FormControllers;
