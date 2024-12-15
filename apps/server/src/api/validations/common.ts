import {ValidationChain} from "express-validator";
import {z} from "zod";

export function commonText(target: ValidationChain) {
    return target
        .isString().withMessage('must be string')
        .exists().withMessage('is required')
}

export const dateString =  z.string().refine(
  dateString => {
      const date = new Date(dateString);
      return date instanceof Date && !isNaN(date.getTime());
  }
)