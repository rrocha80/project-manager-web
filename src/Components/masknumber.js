import React, {useEffect,useState} from "react";

export default function MaskNumber(props) {
    const [vlr, setVlr] = useState([])
    useEffect(()=>{
        setVlr(props.value)
      }, [])
function mascaraMoeda(event) {
    console.log('props', props.value)
    const onlyDigits = event.target.value
      .split('')
      .filter((s) => /\d/.test(s))
      .join('')
      .padStart(3, '0');
    const digitsFloat = onlyDigits.slice(0, -2) + '.' + onlyDigits.slice(-2);
    event.target.value = maskCurrency(digitsFloat);
  }

  function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(valor);
  }



  return (
    <div>
      <input type="text" value={this.vlr} onChange={(e) => mascaraMoeda(e)} maxLength={15} />
      {props.children}
      </div>
  );
}