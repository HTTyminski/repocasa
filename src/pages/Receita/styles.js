import styled from 'styled-components';

export const TableWrapper = styled.div`
  padding: 20px 15px;
  width: ${props => props.width || 'auto'};

  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;

    thead {
      tr {
        th {
          background-color: #f6f7ff;
          border-bottom: solid 3px #e3e7ff;
          color: #6d7882;
          font-size: 12px;
          font-weight: 500;
          padding: 9px 0;
          text-align: center;
        }
      }
    }

    tbody {
      tr {
        &:nth-of-type(odd) {
          background-color: #fafafc;
        }

        td {
          border-bottom: solid 1px #f6f7ff;
          border-left: solid 1px #f6f7ff;
          border-right: solid 1px #f6f7ff;
          color: #6d7882;
          font-size: 12px;
          font-weight: 500;
          height: 44px;
          padding: 0 8px;
          position: relative;
          text-align: center;
          vertical-align: middle;

          .actions {
            position: absolute;
            right: 0;
            bottom: 0;
            top: 0;
            width: 75px;
          }
        }
      }
    }
  }
`;
