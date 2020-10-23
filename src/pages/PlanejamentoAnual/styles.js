import styled from 'styled-components';

export const TableWrapper = styled.div`
  padding: 20px 15px;

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
    margin-bottom: 10px;

    &.col_5 {
      width: 5%;
      float: left;
      margin-right: 1%;
    }

    &.col_35 {
      width: 34%;
      float: left;
      margin-right: 1%;
    }

    &.col_60 {
      width: 59%;
      float: left;
    }

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
        &:first-child {
          background-color: #fff !important;

          td {
            border: 0;
            color: #6d7882;
            font-size: 10px;
            font-weight: 600;

            &:first-child {
              border-left: solid 1px #f6f7ff;
            }

            &:last-child {
              border-right: solid 1px #f6f7ff;
            }
          }
        }

        &:nth-of-type(odd) {
          background-color: #fafafc;
        }

        td {
          border-bottom: solid 1px #f6f7ff;
          color: #6d7882;
          font-size: 12px;
          font-weight: 500;
          height: 44px;
          padding: 0 8px;
          text-align: center;
          vertical-align: middle;

          &:first-child {
            border-left: solid 1px #f6f7ff;
          }

          &:last-child {
            border-right: solid 1px #f6f7ff;
          }
        }
      }
    }
  }
`;
