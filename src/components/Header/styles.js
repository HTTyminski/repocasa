import styled from 'styled-components';

export const HeaderContent = styled.header`
  align-items: center;
  background-color: #fff;
  border-bottom: solid 1px #f6f7ff;
  display: flex;
  min-height: 79px;
  padding: 0 0 0 26px;

  .header__logo {
    align-items: center;
    border-right: solid 1px #f6f7ff;
    display: flex;
    height: 79px;
    width: calc(250px - 26px);

    a {
      display: flex;

      svg {
        height: 24px;
      }
    }
  }

  .header__hotel-name {
    display: none !important;
    align-items: center;
    border-radius: 6px;
    border: solid 1px #8a97b1;
    color: #8a97b1;
    display: flex;
    height: 50px;
    justify-content: center;
    margin-left: 20px;
    min-width: 150px;
    padding: 0 10px;
  }
`;
