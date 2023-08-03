import {
  NotAuthorizedException,
  UserNotFoundException,
} from "@aws-sdk/client-cognito-identity-provider";
import { CustomError } from "../../../core/errors/CustomErorr";

export class CognitoAuthenticationError {
  static execute(error: any) {
    if (
      error instanceof NotAuthorizedException ||
      error instanceof UserNotFoundException
    ) {
      throw new CustomError({
        name: "INVALID_CREDENTIALS",
        message: error.message,
        type: "ERROR",
        code: 400,
      });
    }

    throw new Error(error);
  }
}
