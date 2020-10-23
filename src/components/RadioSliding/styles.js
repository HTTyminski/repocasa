import styled from 'styled-components';

export const RadioWrapper = styled.div`
.wrapper {
  display: flex;
  flex-direction: row;
}

.section-radio-button {
  .radio-buttons {
    position: relative;
    border-radius: 8px;
    margin: 1em;
    padding: 0;
    height: 1.5em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid rgba(227, 231, 255, 1);
    height: 32px;
    input[type=radio] {
      display: none;
    }
    label {
      cursor: pointer;
      z-index: 1;
      width: 35px;
      color: rgba(227, 231, 255, 1);
      text-align: center;
      text-shadow: 0 1px 1px rgba(0,0,0,0.45);
      margin-top: 5px;

      svg {
        fill: #e3e7ff;
        width: 20px;
        
        .a {
          fill: #e3e7ff;
        }
      }
    }
    .slider {
      position: absolute;
      width: 35px;
      height: 30px;
      border-radius: 8px;
      -webkit-transition: all .1s ease;
      transition: all .1s ease;
    }
    .first {
      &:checked ~ .slider {
        background: rgb(0, 48, 94);
        left: 0px;
        color: white;
      }
    }
    .second {
      &:checked ~ .slider {
        background: rgb(0, 48, 94);
        left: 35px;
        color: white;
      }
    }
  }
`;