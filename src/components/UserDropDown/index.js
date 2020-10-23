import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserAvatar from 'react-user-avatar';

import { signOut } from '../../store/modules/auth/actions';

import useOutsideClick from '../../hook/useOutsideClick';

import { ReactComponent as IconArrow } from '../../assets/svg/icon-arrow-down.svg';
import { UserDropDownContent } from './styles';

export default function UserDropDown() {
  const ref = useRef();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const profile = useSelector(state => state.user.profile);

  function handleShowMenu() {
    setShowMenu(!showMenu);
  }

  function handleSignOut(e) {
    e.preventDefault();
    dispatch(signOut());
  }

  useOutsideClick(ref, () => setShowMenu(false));

  return (
    <UserDropDownContent ref={ref}>
      <button type="button" onClick={handleShowMenu}>
        <UserAvatar size="38" name={profile.name} colors={['#00305e']} />
        <span>{profile.name}</span>
        <IconArrow className="icon-arrow" />
      </button>
      {showMenu && (
        <div className="dropdown">
          <a href="/">
            <span>Alterar senha</span>
          </a>
          <a href="/" onClick={handleSignOut}>
            <span>Sair</span>
          </a>
        </div>
      )}
    </UserDropDownContent>
  );
}
