import styled from 'styled-components';

const Container = styled.div`
  background-color: #fff;
  border: solid 1px #f6f7ff;
  margin-top: 15px;
  overflow: hidden;

  &.content {
    &.full {
      .title {
        border-bottom: solid 1px #f6f7ff;
        display: flex;
        padding: 17px;
        justify-content: space-between;

        p,
        h1 {
          color: #404040;
          font-size: 16px;
          font-weight: 400;

          span {
            color: #00305e;
            font-size: 12px;
            margin-left: 5px;
          }
        }

        button {
          height: 31px;
          max-width: 154px;
        }

        &--equal {
          padding-top: 23px;
          padding-bottom: 23px;
        }

        &--dropdown {
          background-color: #f6f7ff;
          display: flex;
          align-items: center;

          &.dd-GAS {
            background-color: #484d7a;
          }

          &.dd-ELECTRICITY {
            background-color: #ffb300;
          }

          &.dd-WATER {
            background-color: #67a4ff;
          }

          .dd-title {
            color: #fff;

            span {
              display: block;
              font-size: 10px;
            }
          }

          .dd-select {
            display: flex;
            align-items: center;

            svg {
              fill: #fff;
              margin-right: 8px;
            }
          }
        }
      }

      .table {
        padding: 17px;
      }
    }
  }
`;

export default Container;
