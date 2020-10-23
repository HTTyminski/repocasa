import styled from 'styled-components';

export const StyledTable = styled.div`
  background-color: #fff;
  display: flex;
  padding: 10px 0;

  .table__group {
    flex: 1;
    text-align: center;
    margin: 0 8px;
  }

  .table__head {
    background-color: #f6f7ff;
    border-bottom: solid 3px #e3e7ff;
    color: #6d7882;
    padding: 9px 0;
  }

  .table__column {
    display: flex;
  }

  .table__body {
    border: solid 1px #f6f7ff;
    list-style: none;
    padding: 0;
    width: 100%;

    li {
      border-bottom: solid 1px #f6f7ff;
      color: #6d7882;
      font-size: 12px;
      font-weight: 500;
      padding: 11px 0;

      &:first-child {
        background-color: transparent !important;
        border: 0;
        font-weight: 700;
        height: 38px;
      }

      &:nth-of-type(odd) {
        background-color: #fafafc;
      }
    }
  }
`;
