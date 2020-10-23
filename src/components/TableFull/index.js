import React, { useState } from 'react';

import Icons from '../Icons';
import { TableWrapper } from './styles';

const DATA = [
  {
    id: 1,
    name: 'Relógio geral',
    date: '14/10/2019',
    time: '17:58',
    read: '123,00',
  },
  {
    id: 2,
    name: 'Relógio novo',
    date: '02/02/2019',
    time: '16:24',
    read: '230,00',
  },
];

export default function TableFull() {
  const [isOpen, toggleIsOpen] = useState([]);

  const handleDropdownClick = id => {
    if (!isOpen.includes(id)) {
      toggleIsOpen(...isOpen, id);
    } else {
      const newList = isOpen.filter(value => value === id);
      toggleIsOpen(newList);
    }
  };

  // const handleDropdownClick = e => {
  //   e.preventDefault();
  //   const currentID = e.currentTarget.id;
  //   console.log(currentID);

  //   const newIsOpenState = (isOpen[id] = !isOpen[id]);
  //   console.log(newIsOpenState);

  //   // toggleIsOpen(newIsOpenState);
  // };

  return (
    <>
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>Nome do relógio</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Leitura</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {DATA.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.read}</td>
                <td>
                  <div className="actions">
                    <button
                      type="button"
                      onClick={() => handleDropdownClick(item.id)}
                    >
                      <Icons name="iconMore" />
                    </button>
                    {/* {isOpen.includes(item.id) ? (
                    <nav>
                      <a href="/">Editar</a>
                      <a href="/">Excluir</a>
                    </nav>
                  ) : (
                    ''
                  )} */}
                    <nav>
                      <a href="/">Editar</a>
                      <a href="/">Excluir</a>
                    </nav>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </>
  );
}
