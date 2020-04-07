import React, { FunctionComponent } from 'react';
import { FiSend, FiTrash2, FiSearch } from 'react-icons/fi';

import './ControllerTab.css'
import Controller from './Controller';

interface ControllerTabProps {
  updateTree: Function;
}

const ControllerTab: FunctionComponent<ControllerTabProps> = (props) => {
  return(
    <div className="ControllerTab" >
      <Controller placeholderText="Inserir Nodo" icon={FiSend} updateTree={props.updateTree} />
      <Controller placeholderText="Buscar Nodo" icon={FiTrash2} updateTree={props.updateTree} />
      <Controller placeholderText="Deletar Nodo" icon={FiSearch} updateTree={props.updateTree} />
    </div>
  );
};

export default ControllerTab;