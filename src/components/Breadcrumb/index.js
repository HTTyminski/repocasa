import React from 'react';
import { Link } from 'react-router-dom';

import { BreadcrumbWrapper } from './styles';

export default function Breadcrumb({ ...children }) {
  const fullPath = children.props.match.path;
  const pathUnities = fullPath.match(/[^/]+/g);

  if (fullPath !== '/dashboard') {
    pathUnities.splice(0, 1);
  }

  const getURL = (path, limit) => String(path.match(new RegExp(`.*${limit}`)));

  return (
    <BreadcrumbWrapper>
      {pathUnities.map((unity, index) => (
        <Link key={index} to={getURL(fullPath, unity)}>
          {unity}
        </Link>
      ))}
    </BreadcrumbWrapper>
  );
}
