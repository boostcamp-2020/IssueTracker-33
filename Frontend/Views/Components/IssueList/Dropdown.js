import React, { useState } from 'react';
import styled from 'styled-components';
import useClickOutside from '../Modal';
import ChoiceList from './ChoiceList';

const DropdownWrapper = styled.div`
  position: relative;
`;
const Dropdown = ({ name, values }) => {
  const [isVisible, setIsVisible] = useState(false);

  const domNode = useClickOutside(() => {
    setIsVisible(false);
  });

  const onToggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  return (
    <DropdownWrapper>
      <div ref={domNode}>
        <button type="button" onClick={onToggleDropdown}>
          {name}
        </button>
        {isVisible && <ChoiceList name={name} values={values} onToggleDropdown={onToggleDropdown} />}
      </div>
    </DropdownWrapper>
  );
};

export default Dropdown;
