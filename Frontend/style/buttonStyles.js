import styled from 'styled-components';

const BasicButton = styled.button`
  margin: 0px;
  padding: 6px 14px;
  border: solid 1px rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  outline: none;
  box-shadow: rgba(27, 31, 35, 0.04) 0px 0px 1px 0px;
  font-size: 14px;
  font-weight: 500;
  color: #24292e;
  background-color: #fafbfc;
  cursor: pointer;
  &:hover {
    background-color: rgba(27, 31, 35, 0.08);
    transition: 0.2s;
  }
`;

export default BasicButton;
