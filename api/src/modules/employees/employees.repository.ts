import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios, { AxiosError } from 'axios'
import { plainToInstance } from 'class-transformer'
import { configKeys } from 'src/config/configuration'
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto'
import { Employee } from './entities'
import {
  EmployeesModuleException,
  EmployeesModuleExceptionType,
} from './models/employeeModuleException'

@Injectable()
export class EmployeesRepository {
  private get apiUrl() {
    return `${this._configService.get(configKeys.crudApiUrl)}/employees`
  }

  constructor(private readonly _configService: ConfigService) {}

  async save(createEmployeeDto: CreateEmployeeDto): Promise<any> {
    try {
      const response = await axios.post(this.apiUrl, createEmployeeDto)
      return response.data
    } catch (error) {
      throw error
    }
  }

  async findAll(): Promise<Employee[]> {
    try {
      const response = await axios.get<Employee[]>(this.apiUrl)
      return plainToInstance(Employee, response.data)
    } catch (error) {
      throw error
    }
  }

  async findByCpf(cpf: string): Promise<Employee | undefined> {
    try {
      const employees = await this.findAll()
      return employees.find((x) => x.cpf === cpf)
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response.status === 404)
        throw new EmployeesModuleException(
          EmployeesModuleExceptionType.ENTITY_NOT_FOUND,
          `Employee with CPF ${cpf} does not exist`,
        )
    }
  }

  async findById(id: string): Promise<Employee> {
    try {
      const response = await axios.get(`${this.apiUrl}/${id}`)
      return plainToInstance(Employee, response.data)
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response.status === 404)
        throw new EmployeesModuleException(
          EmployeesModuleExceptionType.ENTITY_NOT_FOUND,
          `Employee with id ${id} does not exist`,
        )
    }
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<any> {
    try {
      const response = await axios.put(
        `${this.apiUrl}/${id}`,
        updateEmployeeDto,
      )
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response.status === 404)
        throw new EmployeesModuleException(
          EmployeesModuleExceptionType.ENTITY_NOT_FOUND,
          `Employee with id ${id} does not exist`,
        )
    }
  }

  async delete(id: string) {
    try {
      await axios.delete(`${this.apiUrl}/${id}`)
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response.status === 404)
        throw new EmployeesModuleException(
          EmployeesModuleExceptionType.ENTITY_NOT_FOUND,
          `Employee with id ${id} does not exist`,
        )
    }
  }
}
