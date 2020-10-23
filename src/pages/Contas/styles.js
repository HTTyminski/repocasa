import styled from 'styled-components';

export const EmptyContainer = styled.div`
  padding: 20px 15px;

  .inner {
    border: solid 1px #f6f7ff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0 60px 0;

    p {
      color: #8a97b1;
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 30px;
      margin-top: 24px;
    }

    .select {
      display: flex;
      align-items: center;

      svg {
        fill: #707070;
        margin-right: 8px;
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

        .attachment {
          max-width: 130px;
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

          .attach {
            overflow-wrap: break-word;
            text-decoration: underline;
            transition: opacity 300ms ease;

            &:hover {
              opacity: 0.8;
            }
          }
        }
      }
    }
  }
`;
