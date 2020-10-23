import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: #fafafc;
  height: 100%;
`;

export const App = styled.div`
  display: flex;
  min-height: calc(100vh - 80px);
  position: relative;

  .app__sidebar {
    background-color: ${({ theme }) => theme.hotelTwo};
    display: flex;
    flex: 0 0 250px;
    flex-direction: column;

    ul {
      flex: 1;
    }

    .sidebar__logo {
      display: flex;
      justify-content: center;
      margin-bottom: 9px;
      width: 100%;

      a {
        width: 69px;

        svg {
          fill: #fff;
          opacity: 0.6;
          width: 69px;
        }
      }
    }
  }

  .app__content {
    flex: 1;
    padding: 25px 30px;
    position: relative;
    overflow: hidden;
  }
`;

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
