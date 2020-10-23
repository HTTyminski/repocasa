import styled from 'styled-components';

export const StyledBurger = styled.div`
  display: flex;
  padding: 0;
  position: absolute;
  right: 0;
  top: 25px;
  z-index: 1;

  .filter__icon {
    background-color: #00305e;
    border-radius: 6px 0 0 6px;
    display: flex;
    padding: 12px;

    svg {
      fill: #fff;
      height: 24px;
      width: 24px;
    }
  }

  .filter__title {
    align-items: center;
    display: flex;
    flex: 1;
    padding: 21px;

    img {
      margin-right: 15px;
    }

    span {
      color: #a6b2c2;
      letter-spacing: 0.04rem;
    }
  }

  a {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #edeff2;
    border: 2px solid #edeff2;
    appearance: none;
    height: 100%;
    width: 62px;
  }
`;
