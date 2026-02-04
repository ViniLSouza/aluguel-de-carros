import React from 'react';
import './styles.scss';

type CardDefaultProps = {
  children: React.ReactNode;
};

export function CardDefault({ children }: CardDefaultProps) {
  return <div className="card-default">{children}</div>;
}
