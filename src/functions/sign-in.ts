import "reflect-metadata";
import { APIGatewayEvent } from "aws-lambda";
import { IAuthenticationAdministrator } from "../administrator/domain/interface/IAuthenticationAdministrator";
import { DIContainer } from "../ioc";
import { AuthenticationAdministratorUseCase } from "../administrator/domain/use-cases/AuthenticationAdministratorUseCase";
import { CustomError } from "../core/errors/CustomErorr";

export const handler = async (event: APIGatewayEvent) => {
  try {
    const payload = JSON.parse(event.body) as IAuthenticationAdministrator;
    await DIContainer.resolve(AuthenticationAdministratorUseCase).execute(
      payload
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Successfully authorized" }),
    };
  } catch (error: CustomError | any) {
    return {
      statusCode: error.code,
      body: JSON.stringify({ message: error.message, name: error.name }),
    };
  }
};
