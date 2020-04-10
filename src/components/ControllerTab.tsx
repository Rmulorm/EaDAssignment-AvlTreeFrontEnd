import React, { FunctionComponent } from 'react';
import { FiTrash2, FiSearch, FiPlus } from 'react-icons/fi';

import './ControllerTab.css'

import Controller from './Controller';
import api from '../services/api';
import SearchNodeReturn from '../types/SearchNodeReturn';

interface ControllerTabProps {
  updateTree: Function;
}

const ControllerTab: FunctionComponent<ControllerTabProps> = (props) => {

  const addNode = async (value: number) => {
    await api.post('tree', {
      value: value
    });
  };

  const searchNode = async (value: number): Promise<SearchNodeReturn> => {
    const searchResponse = await api.get<SearchNodeReturn>(`tree/${value}`);
    const searchData = searchResponse.data;

    if (searchData.isNodeInTheTree) {
      alert(`O nodo procurado existe na árvore, seguindo o caminho\n${searchResponse.data.searchedNodes}`);
    } else {
      alert(`Não existe um nodo com o valor ${value} na árvore`);
    }

    return searchData;
  };

  const deleteNode = async (value: number) => {
    api.delete(`tree/${value}`)
    .catch((error) => {
      alert(`Não existe um nodo com o valor ${value} na árvore`);
    })
  };

  return(
    <div className="ControllerTab" >
      <Controller
        placeholderText="Inserir Nodo"
        icon={FiPlus}
        updateTree={props.updateTree}
        interactWithBackEnd={addNode}
      />
      <Controller
        placeholderText="Buscar Nodo"
        icon={FiSearch}
        interactWithBackEnd={searchNode}
        updateTree={props.updateTree}
      />
      <Controller
        placeholderText="Deletar Nodo"
        icon={FiTrash2}
        updateTree={props.updateTree}
        interactWithBackEnd={deleteNode}
      />
    </div>
  );
};

export default ControllerTab;