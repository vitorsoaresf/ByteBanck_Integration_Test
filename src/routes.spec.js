import { render, screen } from '@testing-library/react';
import App from './paginas/Principal/App';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import Cartoes from './componentes/Cartoes';
import AppRoutes from './routes';

describe('Rotas', () => {
  test(`Deve renderizar a rota principal`, () => {
    // em nosso componente App temos o chamado do hook useLocation que
    //eh um elemento da lib react-router-dom. E para sanar o problema de
    //nao reconhecimento do uselocation, precisamos envelopar o App abaixo,
    //com um wrapper do BrowserRouter para que o erro seja sanado.
    render(<App />, { wrapper: BrowserRouter });

    const usuario = screen.getByText('Olá, Joana :)!');

    expect(usuario).toBeInTheDocument();
  });

  //teste de rota da aplicacao
  test(`Deve renderizar a rota cartoes`, () => {
    const rota = '/cartoes';

    render(
      <MemoryRouter initialEntries={[rota]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="cartoes" element={<Cartoes />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const meusCartoes = screen.getByText('Meus cartões');

    expect(meusCartoes).toHaveTextContent(`Meus cartões`);
  });

  test('Deve renderizar a localizacao da rota atual', () => {
    const rota = '/cartoes';

    // teste com controle de pilha de historico usando o MemoryRouter opu BrowserRouter
    render(
      <MemoryRouter initialEntries={[rota]}>
        <App />
      </MemoryRouter>
    );

    const localizacao = screen.getByTestId('local');

    expect(localizacao).toHaveTextContent(rota);
  });

  test('Deve renderizar a pagina not found', () => {
    const rota = '/example';

    // renderizando todas as rotas da aplicacao para testar a 404
    render(
      <MemoryRouter initialEntries={[rota]}>
        <AppRoutes />
      </MemoryRouter>
    );
    const element404 = screen.getByTestId('pagina-404');

    // mesma assercao, fazem a mesma coisa
    expect(element404).toHaveTextContent('Ops! Não encontramos a página');
    expect(element404).toContainHTML('<h1>Ops! Não encontramos a página</h1>');
  });
});

/**
O <MemoryRouter/> é um dos recursos mais importantes 
do react router-dom para quem deseja testar as rotas
de uma aplicação. Ele dá um controle muito grande sobre
as rotas, pelo fato de não estar vinculado a pilha de
histórico de navegação como o <BrowserRouter/>, dando
mais liberdade para acessar o local que desejar.
 */
