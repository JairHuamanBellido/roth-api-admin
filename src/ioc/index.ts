import { Container } from "inversify";
import { AdministratorRepository } from "../administrator/infrastructure/repository/AdministratorRepository";

const DIContainer = new Container();

DIContainer.bind<AdministratorRepository>(AdministratorRepository).toSelf();

export { DIContainer };
