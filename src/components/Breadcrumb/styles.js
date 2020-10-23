import styled from 'styled-components';

export const BreadcrumbWrapper = styled.nav`
  margin-bottom: 5px;

  a {
    color: #8a97b1;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    text-transform: capitalize;
    transition: opacity 300ms ease;
    opacity: 1;

    &:hover {
      opacity: 0.7;
    }

    + a::before {
      content: '/';
      padding: 0 3px;
      text-decoration: none;
    }
  }
`;
