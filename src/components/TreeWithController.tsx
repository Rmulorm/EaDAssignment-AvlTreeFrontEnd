import React, { useState, useEffect, FunctionComponent } from 'react';
import { ReactD3TreeItem } from 'react-d3-tree';

import SearchNodeReturn from '../types/SearchNodeReturn';
import ControllerTab from './ControllerTab';
import TreeTab from './TreeTab';
import api from '../services/api';

import './TreeWithController.css';

const TreeWithController: FunctionComponent = () => {

  const[treeData, setTreeData] = useState<ReactD3TreeItem>({});

  useEffect(() => {
    updateTree();
  }, []);
  
  const updateTree = async (searchNodes?: SearchNodeReturn) => {
    await api.get<ReactD3TreeItem>('tree', {
      params: {
        isNodeInTheTree: searchNodes?.isNodeInTheTree,
        searchedNodes: searchNodes?.searchedNodes
      }
    })
    .then((response) => {
      setTreeData(response.data);
    });
  }

  return(
    <div className="TreeWithController" >
      <ControllerTab updateTree={updateTree} />
      <TreeTab treeData={treeData} />
    </div>
  );
}

export default TreeWithController;
