import { inject, injectable } from "inversify";
import { AdministratorRepository } from "../../infrastructure/repository/AdministratorRepository";
import { UseCase } from "../../../core/use-case/use-case";
import { IAuthenticationAdministrator } from "../interface/IAuthenticationAdministrator";

@injectable()
export class AuthenticationAdministratorUseCase
  implements UseCase<IAuthenticationAdministrator, any>
{
  constructor(
    @inject(AdministratorRepository)
    private readonly _repository: AdministratorRepository
  ) {}
  async execute({ email, password }: IAuthenticationAdministrator) {
    return await this._repository.authentication({ email, password });
  }
}
