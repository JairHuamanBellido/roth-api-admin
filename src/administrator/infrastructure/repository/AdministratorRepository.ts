import { injectable } from "inversify";
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { Administrator } from "../../domain/entity/Administrator";
import { config } from "dotenv";
import { CognitoError } from "../errors/CognitoError";
import { IAuthenticationAdministrator } from "../../domain/interface/IAuthenticationAdministrator";
import { CognitoAuthenticationError } from "../errors/CognitoAuthenticationError";

config();

@injectable()
export class AdministratorRepository {
  private cognito: CognitoIdentityProviderClient;

  constructor() {
    this.cognito = new CognitoIdentityProviderClient({ region: "us-east-2" });
  }

  async create(administrator: Administrator) {
    const command = new SignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID ?? "",
      Username: administrator.email,
      Password: administrator.password,
      UserAttributes: [
        {
          Name: "email",
          Value: administrator.email,
        },
        { Name: "name", Value: administrator.name },
      ],
    });

    return await this.cognito
      .send(command)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        CognitoError.execute(error);
      });
  }
  async authentication({ email, password }: IAuthenticationAdministrator) {
    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        CLIENT_ID: process.env.COGNITO_CLIENT_ID ?? "",
      },
      ClientId: process.env.COGNITO_CLIENT_ID ?? "",
    });

    return await this.cognito
      .send(command)
      .then((res) => res)
      .catch((error) => {
        CognitoAuthenticationError.execute(error);
      });
  }
}
