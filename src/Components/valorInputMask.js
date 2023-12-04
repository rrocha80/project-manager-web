import React from 'react';
import InputMask from 'react-input-mask';
function ValorInputMask(props) {
  return (
    <InputMask 
      mask='#.##9,99' 
      value={props.value} 
      onChange={props.onChange}>
    </InputMask>
  );
}

export default ValorInputMask;