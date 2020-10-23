import styled from 'styled-components';

export const StyledContainer = styled.div`
  background-color: #fff;
  border: solid 1px #f6f7ff;
  margin-top: 15px;

  &.content {
    &.empty {
      padding: 17px;

      .inner {
        border: solid 1px #f6f7ff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 100px 0 60px 0;

        p {
          color: #8a97b1;
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 30px;
          margin-top: 24px;

          strong {
            color: #6d7882;
          }
        }

        button {
          appearance: none;
          align-items: center;
          justify-content: center;
          background-color: #00305e;
          border: 0;
          border-radius: 3px;
          color: #fff;
          display: flex;
          font-size: 12px;
          width: 100%;
          transition: opacity 300ms ease;

          &:hover {
            opacity: 0.9;
            background-color: red;
          }

          svg {
            fill: #fff;
            margin-right: 10px;
          }
        }

        button {
          font-weight: 500;
          height: 40px;
          max-width: 268px;
        }
      }
    }

    &.full {
      .title {
        border-bottom: solid 1px #f6f7ff;
        display: flex;
        padding: 17px;
        justify-content: space-between;

        p {
          color: #404040;
          font-size: 16px;

          span {
            color: #00305e;
            font-size: 12px;
            margin-left: 5px;
          }
        }

        button {
          appearance: none;
          align-items: center;
          justify-content: center;
          background-color: #00305e;
          border: 0;
          border-radius: 3px;
          color: #fff;
          display: flex;
          font-size: 12px;
          width: 100%;
          transition: opacity 300ms ease;

          &:hover {
            opacity: 0.9;
          }

          svg {
            fill: #fff;
            margin-right: 10px;
          }
        }

        button {
          height: 31px;
          max-width: 154px;
        }
      }

      .table {
        padding: 17px;
      }
    }
  }
`;

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
    width: 100%;

    thead {
      tr {
        th {
          background-color: #f6f7ff;
          border-bottom: solid 3px #e3e7ff;
          color: #6d7882;
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
          color: #6d7882;
          font-size: 12px;
          font-weight: 500;
          padding: 11px 0;
          text-align: center;

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
