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
