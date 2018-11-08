import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%;
  }
`;

const Form = styled.form`
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
    text-align: left;
  }
  input,
  textarea,
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    padding: 1rem;
    margin-top: 0.5rem;
    font-size: 1rem;
    background-color: #efefef;
    border-radius: 4px;
    border: 1px solid #efefef;
    &:focus {
      outline: 0;
      border: 1px solid black;
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: black;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 400;
    padding: 0.5rem 1.2rem;
    cursor: pointer;
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
  }
`;

export default Form;
