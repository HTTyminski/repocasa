import styled from 'styled-components';
import { darken } from 'polished';

export const StyledBoxes = styled.div`
  display: flex;
  margin-top: 14px;

  .box__item {
    background-color: #fff;
    border-left: solid 3px #00305e;
    display: flex;
    flex: 1;
    padding: 16px 16px 13px 16px;
    width: 33.3%;

    &:nth-child(2) {
      margin: 0 17px;
    }
    .arrow {
      margin-right: 10px;

      &.consumption-up {
        border-bottom: 10px solid #e3e7ff;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        height: 0;
        width: 0;
      }

      &.consumption-down {
        border-top: 10px solid #e3e7ff;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        height: 0;
        width: 0;
      }
    }

    .box__item-left {
      h3 {
        color: #6d7882;
        font-size: 14px;
        font-weight: 400;
      }

      span {
        align-items: center;
        color: #8a97b1;
        display: flex;
        font-size: 30px;
        font-weight: 700;
      }
    }

    .box__item-right {
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin-left: auto;

      div {
        align-items: center;
        color: #8a97b1;
        display: flex;

        + div {
          font-weight: 600;
        }
      }

      .icon-type-0 {
        background-color: rgba(103, 164, 255, 1);
      }
      
      .icon-type-1 {
        background-color: rgba(72, 77, 122, 1);
      }
    
      .icon-type-2 {
        background-color: rgba(255, 179, 0, 1);
      }
    
      .icon-type-3 {
        background-color: rgba(103, 164, 255, 1);
      }

      .icon {
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        height: 16px;
        width: 16px;
        margin-right: 8px;

        &--budget {
          background-color: #e3e7ff;

          .circle {
            border: solid 2px #8a97b1;
            border-radius: 5px;
            display: block;
            height: 10px;
            width: 10px;
          }
        }

        &--fulfilled {
          .letter {
            color: #fff;
            font-weight: 500;
            font-size: 12px;
          }
        }
      }
    }
  }
`;

export const StyledTitleAction = styled.div`
  align-items: center;
  background-color: #fff;
  border-bottom: solid 1px #f6f7ff;
  display: flex;
  justify-content: space-between;
  margin-top: 14px;

  .chart-title {
    color: #222222;
    padding: 16px 15px;

    span {
      color: #00305e;
      font-size: 12px;
    }
  }

  .toggle {
    appearance: none;
    border-radius: 3px;
    border: solid 1px #e3e7ff;
    color: #8a97b1;
    height: 24px;
    margin-right: 12px;
    padding: 0 10px;
  }
`;

export const TableWrapper = styled.div`
  background-color: #fff;
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
        &:first-child {
          background-color: #fff !important;

          /* td {
            border: 0;
            color: #6d7882;
            font-size: 10px;
            font-weight: 600;
          } */
        }

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
          height: 44px;
          padding: 0 4px;
          text-align: center;
          vertical-align: middle;

          .actions {
            position: relative;
            display: flex;
            justify-content: center;

            button {
              background-color: transparent;
              color: #4d85ee;
              width: auto;

              &:hover {
                color: ${darken(0.09, '#4d85ee')};
              }

              svg {
                fill: #707070;
                margin: 0;
              }
            }

            nav {
              background-color: #ffffff;
              border: 1px solid #f6f7ff;
              box-shadow: 0px 3px 6px 0px #f6f7ff;
              max-width: 110px;
              position: absolute;
              top: 0;
              left: -70px;
              width: 100%;

              button {
                appearance: none;
                color: #8a97b1;
                font-size: 10px;
                font-weight: 500;
                height: 30px;
                padding: 0 8px;
                width: 100%;

                &:hover {
                  background-color: #f6f7ff;
                  color: #8a97b1;
                }
              }

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
