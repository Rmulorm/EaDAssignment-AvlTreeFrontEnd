import React, { FunctionComponent } from 'react';
import Tree, { ReactD3TreeTranslate, ReactD3TreeItem } from 'react-d3-tree';

interface TreeWrapperProps {
  treeTranslate: ReactD3TreeTranslate;
  treeData: ReactD3TreeItem;
  openContextMenu: Function
};

const treeStyles = {
  links: {
    stroke: "#e02041",
    strokeWidth: 2
  },
  nodes: {
    node: {
      circle: {
        fill: "#41414d",
        stroke: "#41414d"
      } 
    },
    leafNode: {
      circle: {
        fill: "#41414d",
        stroke: "#41414d"
      } 
    }
  }
};

const TreeWrapper: FunctionComponent<TreeWrapperProps> = (props) => {

  const handleNodeClick = (nodeData: ReactD3TreeItem, event: Event) => {
    event.preventDefault();

    const nodeValue = Number(nodeData.name);
    props.openContextMenu(nodeValue);
  }

  return(
    <Tree
      data={props.treeData}
      translate={props.treeTranslate}
      orientation="vertical"
      styles={ treeStyles }
      collapsible={false}
      onClick={ handleNodeClick }
    />
  );
}

export default TreeWrapper;
