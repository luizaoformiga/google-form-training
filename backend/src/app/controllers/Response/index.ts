import { Request, Response } from 'express';
import { ResponseModel } from "@/app/models";

class ResponseControllers {
  async submitResponse(req: Request, res: Response) {
    try {
      const data = {
        formId: req.body.formId,
        userId: req.body.userId,
        response: req.body.response,
      };
      console.log(data.formId);
      console.log(data.userId);

      if (data.response.length > 0) {
        const newResponse = new ResponseModel(data);

        await newResponse.save().then((docs) => {
          res.status(200).json(docs);
        });
      } else {
        res.status(400).send("FIll atleast one field, MF!");
      }
    } catch (error) {
      res.send(error);
    }
  }

  async allResponses(req: Request, res: Response) {
    try {
      const result = await ResponseModel.find().lean();
      res.json(result);
    } catch (e) {
      res.send(e);
    }
  }

  async getResponse(req: Request, res: Response) {
    try {
      const formId = req.params.formId;

      await ResponseModel.find({ formId: formId }).then(async (responses) => {
        res.status(200).json(responses);
      });
    } catch (error) {
      res.send(error);
    }
  }
}

export default ResponseControllers;