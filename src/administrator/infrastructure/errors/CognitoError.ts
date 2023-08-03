import { UsernameExistsException } from "@aws-sdk/client-cognito-identity-provider";
import { CustomError } from "../../../core/errors/CustomErorr";

export class CognitoError {
  static execute(error: any) {
    if (error instanceof UsernameExistsException) {
      throw new CustomError({
        name: "USER_EXISTS",
        message: error.message,
        type: "CONFLICT",
        code: 409,
      });
    }
    throw new Error(error);
  }
}
