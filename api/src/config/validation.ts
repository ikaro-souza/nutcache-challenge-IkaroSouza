import type { ValidationPipeOptions } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'

const options: ValidationPipeOptions = {
  transform: true,
}

export const validationPipe = new ValidationPipe(options)
