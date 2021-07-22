import {useRef, useState} from 'react';

enum Operadores {
  sumar,
  restar,
  multiplicar,
  dividir,
}

export const useCalculadora = () => {
  const [numero, setNumero] = useState('0');
  const [numeroAnterior, setNumeroAnterior] = useState('0');

  const operaciones = useRef<Operadores>();

  const limpiar = () => {
    setNumero('0');
    setNumeroAnterior('0');
  };

  const armarNumero = (numeroTexto: string) => {
    // verificar que exista un punto decimal y no aceptar mas de uno
    if (numero.includes('.') && numeroTexto === '.') return;

    if (numero.startsWith('0') || numero.startsWith('-0')) {
      // Punto decimal
      if (numeroTexto === '.') {
        setNumero(numero + numeroTexto);
      } else if (numeroTexto === '0' && numero.includes('.')) {
        // evaluar si es otro cero y tiene punto
        setNumero(numero + numeroTexto);
      } else if (numeroTexto !== '0' && !numero.includes('.')) {
        //evaluar si es un numero diferente de 0 y no tiene punto
        setNumero(numeroTexto);
      } else if (numeroTexto === '0' && !numero.includes('.')) {
        // eviatar 0000.0000
        setNumero(numero);
      } else {
        setNumero(numero + numeroTexto);
      }
    } else {
      setNumero(numero + numeroTexto);
    }
  };

  const btnDel = () => {
    if (numero.length > 1) setNumero(numero.slice(0, -1));
    if (numero.length === 2 && numero.includes('-')) setNumero('0');
    if (numero.length === 1) setNumero('0');
  };

  const positivoNegativo = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero);
    }
  };

  const intercambiarNumero = () => {
    if (numero.endsWith('.')) {
      setNumeroAnterior(numero.slice(0, -1));
    } else {
      setNumeroAnterior(numero);
    }
    setNumero('0');
  };

  const btnDividir = () => {
    intercambiarNumero();
    operaciones.current = Operadores.dividir;
  };

  const btnMultiplicar = () => {
    intercambiarNumero();
    operaciones.current = Operadores.multiplicar;
  };

  const btnRestar = () => {
    intercambiarNumero();
    operaciones.current = Operadores.restar;
  };

  const btnSumar = () => {
    intercambiarNumero();
    operaciones.current = Operadores.sumar;
  };

  const calcular = () => {
    const num1 = Number(numero);
    const num2 = Number(numeroAnterior);

    switch (operaciones.current) {
      case Operadores.sumar:
        setNumero(`${num1 + num2}`);
        break;
      case Operadores.restar:
        setNumero(`${num2 - num1}`);
        break;
      case Operadores.dividir:
        if (numero === '0') return;
        setNumero(`${num2 / num1}`);
        break;
      case Operadores.multiplicar:
        setNumero(`${num1 * num2}`);
        break;
    }
    setNumeroAnterior('0');
  };

  return {
    numeroAnterior,
    numero,
    limpiar,
    positivoNegativo,
    btnDel,
    btnDividir,
    armarNumero,
    btnMultiplicar,
    btnRestar,
    btnSumar,
    calcular,
  };
};
