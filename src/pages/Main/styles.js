import styled from 'styled-components';

export const StyledMain = styled.div`
  display: flex;

  .main-left,
  .main-right {
    width: 50%;

    &--75 {
      width: 75%;
    }
  }
`;

export const Title = styled.h2`
  color: #404040;
  font-size: 18px;
  font-weight: 400;
  line-height: 18px;
  margin-bottom: 16px;
`;

export const StyledBoxes = styled.div`
  display: flex;
  margin-top: 14px;

  .box__item {
    background-color: #fff;
    border-left: solid 3px #00117d;
    display: flex;
    flex: 1;
    padding: 16px 16px 13px 16px;
    width: 33.3%;

    &:nth-child(2) {
      margin: 0 17px;
    }

    .box__item-left {
      h3 {
        color: #6d7882;
        font-size: 14px;
        font-weight: 400;
      }

      span {
        color: #8a97b1;
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
