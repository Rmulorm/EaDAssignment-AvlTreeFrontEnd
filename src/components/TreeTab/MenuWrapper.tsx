import React, { FunctionComponent } from 'react';
import { Menu, MenuItem, PopoverPosition } from '@material-ui/core';

import api from '../../services/api';

interface MenuWrapperProps {
  nodeValue: number;
  isMenuOpen: boolean;
  closeMenu: Function;
  anchorPosition: PopoverPosition;
  updateTree: Function;
}

const MenuWrapper: FunctionComponent<MenuWrapperProps> = (props) => {

  const handleMenuClose = (event: Event) => {
    event.preventDefault();

    props.closeMenu();
  }

  const  handleNodeDelete = async (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.preventDefault();

    try {
      await api.delete(`tree/${props.nodeValue}`)
    } catch(error) {
      alert(`Não existe um nodo com o valor ${props.nodeValue} na árvore`);
    }

    props.closeMenu();

    props.updateTree();
  };

  return(
    <Menu
      keepMounted
      open={props.isMenuOpen}
      anchorReference="anchorPosition"
      anchorPosition={ props.anchorPosition }
      onClose={ handleMenuClose }
    >
      <MenuItem onClick={handleNodeDelete} >Deletar Nodo</MenuItem>
    </Menu>
  )
};

export default MenuWrapper;