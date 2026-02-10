import {
  MessageDto,
  PaginationDto,
  OrdinationDto,
  GetResponseDto,
  PostResponseDto,
} from './response.dto';

describe('Response DTOs', () => {
  describe('MessageDto', () => {
    it('deve criar uma instância de MessageDto com sucesso', () => {
      const dto = new MessageDto();
      dto.code = 200;
      dto.type = 'success';
      dto.text = 'Teste com sucesso';
      dto.exceptionMessage = '';

      expect(dto).toBeDefined();
      expect(dto.code).toBe(200);
      expect(dto.type).toBe('success');
    });
  });

  describe('PaginationDto', () => {
    it('deve criar uma instância de PaginationDto com os valores corretos', () => {
      const dto = new PaginationDto();
      dto.total = 50;
      dto.perPage = 10;
      dto.currentPage = 1;
      dto.totalPages = 5;

      expect(dto.totalPages).toBe(5);
      expect(dto.total).toBe(50);
    });
  });

  describe('OrdinationDto', () => {
    it('deve aceitar os valores de direção asc e desc', () => {
      const dto = new OrdinationDto();
      dto.direction = 'asc';
      dto.orderBy = 'name';

      expect(dto.direction).toBe('asc');

      dto.direction = 'desc';
      expect(dto.direction).toBe('desc');
    });
  });

  describe('BaseResponseDto & GetResponseDto', () => {
    it('deve compor a resposta completa com data e message', () => {
      const message = new MessageDto();
      message.code = 200;
      message.type = 'success';
      message.text = 'OK';

      const response = new GetResponseDto<string>();
      response.data = 'Lista de itens';
      response.message = message;

      // Testando a parte opcional de paginação
      const pagination = new PaginationDto();
      pagination.total = 1;
      response.pagination = pagination;

      expect(response.data).toBe('Lista de itens');
      expect(response.message.code).toBe(200);
      expect(response.pagination.total).toBe(1);
    });
  });

  describe('Post/Put/Delete ResponseDtos', () => {
    it('deve garantir que data seja booleano por padrão', () => {
      const postResponse = new PostResponseDto();
      postResponse.data = true;

      expect(typeof postResponse.data).toBe('boolean');
      expect(postResponse.data).toBe(true);
    });
  });
});
