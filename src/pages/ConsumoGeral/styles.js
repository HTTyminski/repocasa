import styled from 'styled-components';

export const StyledBoxes = styled.div`
  display: flex;
  margin-top: 14px;
  overflow: hidden;

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
          background-color: #484d7a;

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

export const TwoColumns = styled.div`
  display: flex;

  > div {
    width: 100%;

    &:last-child {
      margin-left: 16px;
    }
  }
`;

export const StyledTitleAction = styled.div`
  align-items: center;
  background-color: #fff;
  border-bottom: solid 1px #f6f7ff;
  display: flex;
  justify-content: space-between;
  /* margin-top: 14px; */

  .chart-title {
    color: #6d7882;
    padding: 16px 15px;
    font-size: 16px;

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
