import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common'
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto'
import { EmployeesService } from './employees.service'
import { EmployeesModuleExceptionFilter } from './filters/employeesModuleFilter'

@Controller('employees')
export class EmployeesController {
  constructor(private readonly _service: EmployeesService) {}

  @Post()
  @UseFilters(new EmployeesModuleExceptionFilter())
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    await this._service.create(createEmployeeDto)
  }

  @Get()
  @UseFilters(new EmployeesModuleExceptionFilter())
  async findAll() {
    return await this._service.findAll()
  }

  @Get(':id')
  @UseFilters(new EmployeesModuleExceptionFilter())
  async findOne(@Param('id') id: string) {
    return await this._service.findOne(id)
  }

  @Put(':id')
  @UseFilters(new EmployeesModuleExceptionFilter())
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return await this._service.update(id, updateEmployeeDto)
  }

  @Delete(':id')
  @UseFilters(new EmployeesModuleExceptionFilter())
  async remove(@Param('id') id: string) {
    await this._service.remove(id)
  }
}
