import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import styled from 'styled-components';

import { AiOutlineCloudUpload } from 'react-icons/ai';
import { Input } from '@rocketseat/unform';
import { Label } from '../Modal/styles';

export const WrapperFileUpload = styled.div`
  display: flex;
`;

export const WrapperFile = styled.div`
  > div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  align-items: center;
  background-color: ${({ theme }) => theme.cWhite};
  border-radius: 3px;
  border: dashed 1px #e3e7ff;
  color: #8a97b1;
  display: flex;
  font-size: 12px;
  font-weight: 500;
  height: 47px;
  justify-content: center;
  transition: opacity 300ms ease;
  width: 100%;
  cursor: pointer;

  > &:hover {
    opacity: 0.6;
  }

  svg {
    fill: ${({ theme }) => theme.hotelOne};
    height: 30px;
    margin-right: 10px;
    width: 30px;
  }
`;

export const IsOK = styled.div`
  width: 100%;
  height: 100%;
  opacity: 1;
  cursor: pointer;

  img {
    border: none !important;
    padding: 0 !important;
    background-color: transparent !important;
    height: 35px;
  }

  button {
    display: none;
    color: #fff;
    font-size: 0.9rem;
  }

  &:hover {
    cursor: pointer;

    img {
      transition-duration: 5s;
      transition-delay: 1s;
      display: none;
    }

    button {
      display: block;
    }
  }
`;

export const Dropzone = props => {
  const [nameUploadData, setNameUploadData] = useState('');

  const onDrop = useCallback(files => {
    const file = files[0];
    const formData = new FormData();

    formData.append('file', file);

    setNameUploadData(files[0].name);
    props.setFormUploadData(files[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Label>Anexo</Label>
      <WrapperFileUpload>
        {nameUploadData ? (
          <WrapperFile>
            <IsOK>
              <AiOutlineCloudUpload />

              <p>{nameUploadData}</p>
            </IsOK>
          </WrapperFile>
        ) : (
          <WrapperFile>
            <div {...getRootProps()}>
              <AiOutlineCloudUpload />

              {isDragActive ? (
                <p>Solte o arquivo aqui</p>
              ) : (
                <p>
                  Arraste e solte ou
                  <span
                    style={{
                      textDecoration: 'underline',
                      color: '#00305e',
                      marginLeft: '3px',
                      fontSize: '13px',
                    }}
                  >
                    procure o arquivo
                  </span>
                </p>
              )}
            </div>
          </WrapperFile>
        )}
      </WrapperFileUpload>
      <Input
        name="attachment"
        {...getInputProps()}
        accept="image/jpeg,image/png,application/pdf"
      />
    </>
  );
};

export default Dropzone;
