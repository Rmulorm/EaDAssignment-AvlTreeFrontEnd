import React, { FunctionComponent, useEffect, useState } from 'react';
import Tree, { ReactD3TreeTranslate, ReactD3TreeItem } from 'react-d3-tree';

import './TreeTab.css'

interface TreeTabProps {
  treeData: ReactD3TreeItem;
}

const TreeTab: FunctionComponent<TreeTabProps> = (props) => {

  const[width, setWidth] = useState(0);
  const[height, setHeight] = useState(0);
  const[treeTranslate, setTreeTranslate] = useState<ReactD3TreeTranslate>();

  useEffect(() => {
    setTreeTranslate({
      x: width / 2,
      y: height / 2
    });
  }, [width, height]);

  const setDimensions = (divRef: HTMLDivElement | null) => {
    if (!divRef) return;

    const divDimensions = divRef.getBoundingClientRect();

    setWidth(divDimensions.width);
    setHeight(divDimensions.height);
  };

  const mountTree = () => {
    if (!props.treeData) {
      return(
        <h1 style={ { textAlign: "center" } } >
          A Árvore está vazia, ensira o primeiro nodo.
        </h1>
      );
    } else {
      return(
        <Tree
          data={props.treeData}
          translate={treeTranslate}
        />
      );
    }
  };

  return(
    <div
      className="TreeTab"
      ref={tc => { setDimensions(tc); } }
    >
    {mountTree()}
    </div>
  );
};

export default TreeTab;