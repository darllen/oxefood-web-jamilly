import React from 'react';

import { Segment } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './App.css';
import Rotas from './Rotas';


export default function App() {

  return (
    <div className="App">

      <ToastContainer />
      <Rotas />

      <div style={{ marginTop: '6%' }}>
        <Segment vertical color='grey' size='tiny' textAlign='center'>
          &copy; 2023 - Projeto WEB VI - IFPE Jaboatão dos Guararapes
        </Segment>
      </div>

    </div>
  );
};
