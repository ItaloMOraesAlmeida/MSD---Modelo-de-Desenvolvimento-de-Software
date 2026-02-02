import { ApiProperty } from '@nestjs/swagger';

export type MessageType = 'success' | 'error' | 'warning' | 'info';

export class MessageDto {
  @ApiProperty({ example: 200 })
  code: number;

  @ApiProperty({ enum: ['success', 'error', 'warning', 'info'] })
  type: MessageType;

  @ApiProperty({ example: 'Operation completed successfully' })
  text: string;

  @ApiProperty({ example: '', required: false })
  exceptionMessage?: string;
}

export class PaginationDto {
  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 10 })
  perPage: number;

  @ApiProperty({ example: 1 })
  currentPage: number;

  @ApiProperty({ example: 10 })
  totalPages: number;
}

export class OrdinationDto {
  @ApiProperty({ enum: ['asc', 'desc'], example: 'asc' })
  direction: 'asc' | 'desc';

  @ApiProperty({ example: 'createdAt' })
  orderBy: string;
}

export class BaseResponseDto<T> {
  @ApiProperty()
  data: T;

  @ApiProperty({ type: MessageDto })
  message: MessageDto;
}

export class GetResponseDto<T> extends BaseResponseDto<T> {
  @ApiProperty({ type: PaginationDto, required: false })
  pagination?: PaginationDto;

  @ApiProperty({ type: OrdinationDto, required: false })
  ordernation?: OrdinationDto;
}

export class PostResponseDto extends BaseResponseDto<boolean> {
  @ApiProperty({ example: true })
  declare data: boolean;
}

export class DeleteResponseDto extends BaseResponseDto<boolean> {
  @ApiProperty({ example: true })
  declare data: boolean;
}

export class PutResponseDto extends BaseResponseDto<boolean> {
  @ApiProperty({ example: true })
  declare data: boolean;
}
