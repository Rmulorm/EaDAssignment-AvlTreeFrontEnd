import React, { FunctionComponent, useState, useEffect } from 'react';
import { ReactD3TreeTranslate, ReactD3TreeItem } from 'react-d3-tree';

import './TreeTab.css'
import TreeWrapper from './TreeWrapper';
import MenuWrapper from './MenuWrapper';

interface TreeTabProps {
  treeData: ReactD3TreeItem;
  updateTree: Function;
};

const initialTreeTranslateState: ReactD3TreeTranslate = {
  x: 0,
  y: 0
};

const TreeTab: FunctionComponent<TreeTabProps> = (props) => {

  const[treeTranslate, setTreeTranslate] = useState<ReactD3TreeTranslate>(initialTreeTranslateState);
  const[clickedNodeValue, setClickedNodeValue] = useState<number>(0);
  const[isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const[mouseX, setMouseX] = useState<number>(0);
  const[mouseY, setMouseY] = useState<number>(0);

  const[divElement, setDivElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!divElement)
      return;
  
    const dimensions = divElement.getBoundingClientRect();
    setTreeTranslate({
      x: dimensions.width / 2,
      y: dimensions.height / 2
    });
  }, [divElement]);

  const handleDivClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();

    setMouseX(event.clientX);
    setMouseY(event.clientY);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  }

  const openContextMenu = (nodeValue: number) => {
    setClickedNodeValue(nodeValue);
    setMenuOpen(true);
  }

  const mountTree = () => {
    if (!props.treeData) {
      return(
        <h1 style={ { textAlign: "center" } } >
          A Árvore está vazia, ensira o primeiro nodo.
        </h1>
      );
    } else {
      return(
        <TreeWrapper
          treeData={props.treeData}
          treeTranslate={treeTranslate}
          openContextMenu={openContextMenu}
        />
      );
    }
  };

  return(
    <div
      className="TreeTab"
      ref={tc => { setDivElement(tc) } }
      onClick={handleDivClick}
    >
      {mountTree()}

      <MenuWrapper
        nodeValue={clickedNodeValue}
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
        anchorPosition={ { top: mouseY, left: mouseX } }
        updateTree={props.updateTree}
      />
    </div>
  );
};

export default TreeTab;
