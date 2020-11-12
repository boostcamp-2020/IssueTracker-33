import React, { useState } from 'react';
import styled from 'styled-components';
import useClickOutside from '../Modal';
import ChoiceList from './ChoiceList';
import { CustomButton } from '../../../style/Neon';
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
        <CustomButton onClick={onToggleDropdown}>{name}</CustomButton>
        {isVisible && <ChoiceList name={name} values={values} onToggleDropdown={onToggleDropdown} />}
      </div>
    </DropdownWrapper>
  );
};

export default Dropdown;
