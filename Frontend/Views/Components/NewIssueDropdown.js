import React, { Fragment, useEffect, useState } from 'react';


const NewIssueDropdown = (props) => {
  const [test, setTest] = useState("not yet")
  

  let layer = {
      backgroundColor : 'aqua',
      display : 'none'
  }

  const change = (e) => {
      setTest(e.target.value)
  }

  return (
    <Fragment>
      <div>
        <span>{props.dropdownTitle}</span>
        <ul> [+]
            <div style={layer}> 
                <li> asdasd </li>
                <li> asdasd </li>
                <li> asdasd </li>
            </div>
        </ul>
      </div>
      <div id={props.dropdownTitle + 'selected'}> {test} </div>
    </Fragment>
  );
};

export default NewIssueDropdown;
