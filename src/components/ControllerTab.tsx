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
    api.post('tree', {
      value: value
    })
    .catch(() => {
      alert(`Valor ${value} já está na árvore.`)
    });
  };

  const searchNode = async (value: number): Promise<SearchNodeReturn> => {
    const searchResponse = await api.get<SearchNodeReturn>(`tree/${value}`);
    const searchData = searchResponse.data;

    if (searchData.isNodeInTheTree) {
      alert(`O nodo procurado existe na árvore, seguindo o caminho\n${searchData.searchedNodes}`);
    } else {
      alert(`Não existe um nodo com o valor ${value} na árvore`);
    }

    return searchData;
  };

  const deleteNode = async (value: number) => {
    api.delete(`tree/${value}`)
    .catch(() => {
      alert(`Não existe um nodo com o valor ${value} na árvore`);
    })
  };

  return(
    <div className="ControllerTab" >
      <Controller
        placeholderText="Inserir Nodo"
        icon={FiPlus}
        interactWithBackEnd={addNode}
        updateTree={props.updateTree}
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
        interactWithBackEnd={deleteNode}
        updateTree={props.updateTree}
      />
    </div>
  );
};

export default ControllerTab;