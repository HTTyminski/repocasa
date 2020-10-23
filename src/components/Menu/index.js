import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Icon from '../Icons';

import { MenuContent } from './styles';

class Menu extends Component {
  state = {
    menuItems: [
      // {
      //   id: 0,
      //   path: '/dashboard/rotinas',
      //   text: 'Rotinas',
      //   icon: 'iconRotina',
      //   isOpen: false,
      // },
      {
        id: 1,
        path: '/dashboard/consumo',
        text: 'Consumo',
        icon: 'iconConsumo',
        isOpen: false,
        submenuItems: [
          {
            path: '/dashboard/consumo/consumo-geral',
            text: 'Consumo geral',
            group: '/consumo',
          },
          {
            path: '/dashboard/consumo/consumo-hotel',
            text: 'Consumo por hotel',
            group: '/consumo',
          },
          {
            path: '/dashboard/consumo/contas',
            text: 'Contas',
            group: '/consumo',
          },
          {
            path: '/dashboard/consumo/leitura-consumo',
            text: 'Leitura de consumo',
            group: '/consumo',
          },
          {
            path: '/dashboard/consumo/planejamento-anual',
            text: 'Planejamento anual',
            group: '/consumo',
          },
          {
            path: '/dashboard/consumo/receita',
            text: 'Receita',
            group: '/consumo',
          },
          {
            path: '/dashboard/consumo/relogios',
            text: 'Relógios',
            group: '/consumo',
          },
        ],
      },
      // {
      //   id: 2,
      //   path: '/dashboard/documentacao-legal',
      //   text: 'Documentação legal',
      //   icon: 'iconDocLegal',
      //   isOpen: false,
      // },
      // {
      //   id: 3,
      //   path: '/dashboard/financeiro',
      //   text: 'Financeiro',
      //   icon: 'iconFinanceiro',
      //   isOpen: false,
      //   submenuItems: [
      //     {
      //       path: '/fin1',
      //       text: 'Financeiro 1',
      //     },
      //     {
      //       path: '/fin2',
      //       text: 'Financeiro 2',
      //     },
      //   ],
      // },
      // {
      //   id: 4,
      //   path: '/ordem-servico',
      //   text: 'Ordem de serviço',
      //   icon: 'iconOrdemServico',
      //   isOpen: false,
      // },
      // {
      //   id: 5,
      //   path: '/sempre-novo',
      //   text: 'Sempre novo',
      //   icon: 'iconSempreNovo',
      //   isOpen: false,
      // },
      // {
      //   id: 6,
      //   path: '/contatos',
      //   text: 'Contatos',
      //   icon: 'iconContatos',
      //   isOpen: false,
      // },
      // {
      //   id: 7,
      //   path: '/corporativo',
      //   text: 'Corporativo',
      //   icon: 'iconCorporativo',
      //   isOpen: false,
      // },
      // {
      //   id: 8,
      //   path: '/grupos-hoteis',
      //   text: 'Grupos de hotéis',
      //   icon: 'iconGrupoHoteis',
      //   isOpen: false,
      // },
    ],
  };

  updateItem = (id, itemAttributes) => {
    const { menuItems } = this.state;
    const index = menuItems.findIndex(x => x.id === id);

    if (index !== -1) {
      this.setState({
        menuItems: [
          ...menuItems.slice(0, index),
          { ...menuItems[index], ...itemAttributes },
          ...menuItems.slice(index + 1),
        ],
      });
    }
  };

  handleOpenSubMenu = item => {
    this.updateItem(item.id, { isOpen: !item.isOpen });
  };

  // handleCloseSubMenu = () => {
  //   const { menuItems } = this.state;
  //   menuItems.forEach(item => {
  //     this.updateItem(item.id, { isOpen: false });
  //   });
  // };

  render() {
    const { menuItems } = this.state;

    return (
      <MenuContent>
        {menuItems.map(item => (
          <li key={item.id} className="menu__item">
            {item.submenuItems ? (
              <button
                type="button"
                onClick={() => {
                  this.handleOpenSubMenu(item);
                }}
                // onBlur={this.handleCloseSubMenu}
              >
                <Icon name={item.icon} />
                <span>{item.text}</span>
              </button>
            ) : (
              <Link
                to={item.path}
                className={
                  window.location.pathname === item.path ? 'active' : ''
                }
              >
                <Icon name={item.icon} />
                <span>{item.text}</span>
              </Link>
            )}

            {item.submenuItems ? (
              <ul className={item.isOpen ? 'submenu open' : 'submenu'}>
                {item.submenuItems
                  ? item.submenuItems.map(submenu => (
                      <li key={submenu.path}>
                        <Link
                          to={submenu.path}
                          className={
                            window.location.pathname === submenu.path
                              ? 'active'
                              : ''
                          }
                        >
                          {submenu.text}
                        </Link>
                      </li>
                    ))
                  : ''}
              </ul>
            ) : (
              ''
            )}
          </li>
        ))}
      </MenuContent>
    );
  }
}

export default withRouter(Menu);
