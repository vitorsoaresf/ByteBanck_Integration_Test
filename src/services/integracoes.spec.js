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

const mockRequisicaoErro = () => {
  return new Promise((_, rej) => {
    setTimeout(() => {
      rej();
    }, 200);
  });
};

describe('Requisicoes para API', () => {
  test('Deve retornar uma lista de transacoes', async () => {
    api.get.mockImplementation(() => mockRequisicao(mockTransacao));
    const transacoes = await buscaTransacoes(mockTransacao);

    expect(transacoes).toEqual(mockTransacao);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });

  test('Deve retornar uma lista vazia quando a requisicao falhar', async () => {
    api.get.mockImplementation(() => mockRequisicaoErro());
    const transacoes = await buscaTransacoes(mockTransacao);

    expect(transacoes).toEqual([]);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });
});
