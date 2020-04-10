import React, { FunctionComponent, FormEvent, useState } from 'react';
import { IconType } from 'react-icons/lib';

import './Controller.css'

interface ControllerProps {
  placeholderText: string,
  icon: IconType,
  updateTree: Function,
  interactWithBackEnd: Function
}

const Controller: FunctionComponent<ControllerProps> = (props) => {

  const[value, setValue] = useState<number>();

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const backendReturn = await props.interactWithBackEnd(value);
    setValue(0);

    await props.updateTree(backendReturn);
  }

  return(
    <form onSubmit={handleFormSubmit} >
      <div className="ControllerWithButton" >
        <input
          type="number"
          value={value}
          onChange={event => setValue(Number(event.target.value))}
          placeholder={props.placeholderText}
        />
        <button type="submit">
          <props.icon size={25} color="#fff" />
        </button>
      </div>
    </form>
  );
};

export default Controller;

