import React, { useState } from 'react';
import useClickOutside from '../Modal';
import ChoiceList from './ChoiceList';

const Dropdown = ({ name, values, setResetQuery }) => {
  const [isVisible, setIsVisible] = useState(false);

  const domNode = useClickOutside(() => {
    setIsVisible(false);
  });

  const onToggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div ref={domNode}>
        <button type="button" onClick={onToggleDropdown}>
          {name}
        </button>
        {isVisible && (
          <ChoiceList name={name} values={values} onToggleDropdown={onToggleDropdown} setResetQuery={setResetQuery} />
        )}
      </div>
    </>
  );
};

export default Dropdown;
