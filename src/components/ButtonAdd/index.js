import styled from 'styled-components';

const ButtonAdd = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.cWhite};
  border-radius: 3px;
  border: dashed 1px #e3e7ff;
  color: #8a97b1;
  display: flex;
  font-size: 10px;
  font-weight: 500;
  height: 26px;
  justify-content: center;
  transition: opacity 300ms ease;
  width: 100%;

  &:hover {
    opacity: 0.6;
  }

  svg {
    fill: #e3e7ff;
    height: 12px;
    margin-right: 10px;
    width: 12px;
  }
`;

export default ButtonAdd;
