import { Injectable } from '@nestjs/common'
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto'
import { EmployeesRepository } from './employees.repository'

@Injectable()
export class EmployeesService {
  constructor(private readonly _repository: EmployeesRepository) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    await this._repository.save(createEmployeeDto)
  }

  async findAll() {
    try {
      return await this._repository.findAll()
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      return await this._repository.findById(id)
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return await this._repository.update(id, updateEmployeeDto)
  }

  async remove(id: string) {
    await this._repository.delete(id)
  }
}
