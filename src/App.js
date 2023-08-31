import { Segment } from 'semantic-ui-react';
import './App.css';
import Home from './views/home/home';
import FormCliente from './views/cliente/formCliente';
import FormProduto from './views/produto/formProduto';
import FormEntragador from './views/entregador/formEntregador';
function App() {

  return (

    <div className="App">

      <Home /><br></br><br></br><br></br>
      <FormCliente /><br></br><br></br><br></br><br></br><br></br>
      

      <div style={{ marginTop: '6%' }}>
        <Segment vertical color='grey' size='tiny' textAlign='center'>
          &copy; 2023 - Projeto WEB VI - IFPE Jaboatão dos Guararapes
        </Segment>
      </div>

    </div>
  );
}

export default App;
