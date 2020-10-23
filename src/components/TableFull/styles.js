import styled from 'styled-components';
import { darken } from 'polished';

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
        &:last-child {
          td {
            border: 0;
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
          padding: 11px 0;
          text-align: center;

          .actions {
            position: relative;

            button {
              background-color: transparent;
              color: #4d85ee;

              &:hover {
                color: ${darken(0.09, '#4d85ee')};
              }

              svg {
                fill: #707070;
              }
            }

            nav {
              background-color: #ffffff;
              border: 1px solid #f6f7ff;
              box-shadow: 0px 3px 6px 0px #f6f7ff;
              max-width: 110px;
              position: absolute;
              top: 0;
              left: -50px;
              width: 100%;

              a {
                color: #8a97b1;
                display: block;
                font-size: 10px;
                padding: 5px 8px;
                text-decoration: none;

                &:hover {
                  background-color: #f6f7ff;
                }
              }
            }
          }
        }
      }
    }
  }
`;
