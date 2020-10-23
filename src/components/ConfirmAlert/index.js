import React from 'react';
import PropTypes from 'prop-types';
// import { MdCheck, MdClose } from 'react-icons/md';

import { Card } from './styles';

export default function ConfirmAlert({
  callback,
  onClose,
  icon,
  title,
  message,
  onlyConfirmButton,
  confirmButtonText,
  cancelButtonText,
  showButtons,
}) {
  return (
    <Card onlyConfirmButton={onlyConfirmButton}>
      {icon}
      <h1>{title}</h1>
      {typeof message === 'object' ? message : <p>{message}</p>}

      {showButtons && (
        <div className="actions">
          <button
            className="btn btn-delete"
            type="button"
            onClick={() => {
              if (callback) callback();

              onClose();
            }}
            // icon={MdCheck}
            // text={confirmButtonText}
          >
            Sim, deletar
          </button>

          {!onlyConfirmButton && (
            <button
              className="btn btn-cancel"
              type="button"
              onClick={onClose}
              // icon={MdClose}
              // text={cancelButtonText}
            >
              Cancelar
            </button>
          )}
        </div>
      )}
    </Card>
  );
}

ConfirmAlert.propTypes = {
  callback: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  icon: PropTypes.element,
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onlyConfirmButton: PropTypes.bool,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  showButtons: PropTypes.bool,
};

ConfirmAlert.defaultProps = {
  callback: null,
  icon: null,
  title: 'Você está certo disso?',
  message: 'Você deseja confirmar esta ação?',
  onlyConfirmButton: false,
  confirmButtonText: 'SIM',
  cancelButtonText: 'NÃO',
  showButtons: true,
};
