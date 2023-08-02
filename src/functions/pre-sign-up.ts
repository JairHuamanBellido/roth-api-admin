import { PreSignUpTriggerEvent } from "aws-lambda";

export const handler = async (event: PreSignUpTriggerEvent, _, callback) => {
  event.response.autoConfirmUser = true;
  event.response.autoVerifyEmail = true;
  callback(null, event);
};
