import "reflect-metadata";
import { APIGatewayEvent } from "aws-lambda";
import { ICreateAdministrator } from "../administrator/domain/interface/ICreateAdministrator";
import { DIContainer } from "../ioc";
import { CreateAdministratorUseCase } from "../administrator/domain/use-cases/CreateAdministratorUseCase";
export const handler = async (event: APIGatewayEvent) => {
  try {
    const payload = JSON.parse(event.body) as ICreateAdministrator;
    await DIContainer.resolve(CreateAdministratorUseCase).execute(payload);
    console.log("user registered");
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Created successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
