import styled from 'styled-components';

export const StyledSearchHotel = styled.div`
  background-color: #fff;
  border-left: solid 3px #00305e;
  display: flex;
  flex-direction: column;
  padding: 8px 12px;

  span {
    color: #00305e;
    font-size: 10px;
  }

  .search-hotel {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  input,
  select {
    appearance: none;
    background-color: transparent;
    border: 0;
    color: #6d7882;
    flex: 1;
    font-size: 12px;
    margin-top: 2px;
  }

  button {
    appearance: none;
    background-color: transparent;
    border: 0;
    margin-top: -8px;
  }
`;
