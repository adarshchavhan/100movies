import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

export default function Error({icon,msg}) {
  const navigate = useNavigate();
  return (
    <SError>
      <iconify-icon className="icon" icon={icon}></iconify-icon>
      <p>{msg}</p>
      <button onClick={() => navigate("/")}>Go back</button>
    </SError>
  )
}

const SError = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  overflow: hidden;
  color: ${ ({theme}) => theme.textColor };
  *{
    font-size: 100px;
  }
  p{
    font-size: 18px;
  }
  button{
    padding: 10px 40px;
    color: ${ ({theme}) => theme.textColor };
    background: transparent;
    border: ${ ({theme}) => theme.border };
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    &:hover,
    &:active{
      color: #fff;
      background: royalblue;
      box-shadow: 0px 5px 10px ${ ({theme}) => theme.shadowColor };
    }
  }
`;
