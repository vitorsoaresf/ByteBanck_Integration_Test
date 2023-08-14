import api from './api';
import { buscaTransacoes } from './transacoes';

jest.mock('./api');

const mockTransacao = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: 100,
    data: '22/11/22',
    mes: 'Novembro',
  },
];

const mockRequisicao = (retorno) => {
  return new Promise((res, req) => {
    setTimeout(() => {
      res({
        data: retorno,
      });
    }, 200);
  });
};

describe('Requisicoes para API', () => {
  test('Deve retornar uma lista de transacoes', async () => {
    api.get.mockImplementation(() => mockRequisicao(mockTransacao));
    const transacoes = await buscaTransacoes(mockTransacao);

    expect(transacoes).toEqual(mockTransacao);
  });
});
