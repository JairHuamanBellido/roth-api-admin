import "reflect-metadata";
import { APIGatewayEvent } from "aws-lambda";
import { ICreateAdministrator } from "../administrator/domain/interface/ICreateAdministrator";
import { DIContainer } from "../ioc";
import { CreateAdministratorUseCase } from "../administrator/domain/use-cases/CreateAdministratorUseCase";
import { CustomError } from "../core/errors/CustomErorr";
export const handler = async (event: APIGatewayEvent) => {
  try {
    const payload = JSON.parse(event.body) as ICreateAdministrator;
    await DIContainer.resolve(CreateAdministratorUseCase).execute(payload);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Created successfully!" }),
    };
  } catch (error: CustomError | any) {
    if (error instanceof CustomError) {
      return {
        statusCode: error.code,
        body: JSON.stringify({ message: error.message, name: error.name }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
