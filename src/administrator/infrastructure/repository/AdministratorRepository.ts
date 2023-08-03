import { injectable } from "inversify";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { Administrator } from "../../domain/entity/Administrator";
import { config } from "dotenv";
import { CognitoError } from "../errors/CognitoError";

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
}
