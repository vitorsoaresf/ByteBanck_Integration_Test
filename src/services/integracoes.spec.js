import api from './api';
import { atualizaSaldo, buscaSaldo } from './saldo';
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

const mockRequisicaoSaldo = (retorno) => {
  return new Promise((res, req) => {
    setTimeout(() => {
      res({
        data: { valor: retorno },
      });
    }, 200);
  });
};

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

  test('Deve retornar o valor atual do saldo', async () => {
    api.get.mockImplementation(() =>
      mockRequisicaoSaldo(mockTransacao[0].valor)
    );

    const saldo = await buscaSaldo();

    expect(saldo).toBe(mockTransacao[0].valor);
    expect(api.get).toHaveBeenCalledWith('/saldo');
  });

  test('Deve retornar o valor de 1000 quando a requisicao falhar', async () => {
    api.get.mockImplementation(() => mockRequisicaoErro());

    const saldo = await buscaSaldo();

    expect(saldo).toEqual(1000);
    expect(api.get).toHaveBeenCalledWith('/saldo');
  });
});

/*
beforeAll(() => {}); // antes de todos os testes;
beforeEach(() => {}); // antes de cada um dos testes
afterAll(() => {}); // depois de finalizar todos os testes
afterEachAll(() => {}); // depois de finalizar cada um dos testes
*/
