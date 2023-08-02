import { inject, injectable } from "inversify";
import { UseCase } from "../../../core/use-case/use-case";
import { Administrator } from "../entity/Administrator";
import { AdministratorRepository } from "../../infrastructure/repository/AdministratorRepository";
import { ICreateAdministrator } from "../interface/ICreateAdministrator";

@injectable()
export class CreateAdministratorUseCase
  implements UseCase<ICreateAdministrator>
{
  constructor(
    @inject(AdministratorRepository)
    private readonly _repository: AdministratorRepository
  ) {}
  async execute({ email, name, password }: ICreateAdministrator) {
    const administrator = new Administrator(name, email, password);
    await this._repository.create(administrator);
  }
}
