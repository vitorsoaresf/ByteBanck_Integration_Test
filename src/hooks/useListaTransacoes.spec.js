import { renderHook, act } from '@testing-library/react';
import { buscaTransacoes } from '../services/transacoes';
import useListaTransacoes from './useListaTransacoes';

jest.mock('../services/transacoes');

const mockTransacao = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: 100,
    data: '22/11/22',
    mes: 'Novembro',
  },
];

describe('hooks/useListaTransacoes.js', () => {
  test('Deve retornar uma lista de transacoes e uma funcao que atualiza', async () => {
    buscaTransacoes.mockImplementation(() => mockTransacao);

    const { result } = renderHook(() => useListaTransacoes());

    expect(result.current[0]).toEqual([]);
    await act(async () => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual(mockTransacao);
  });
});
