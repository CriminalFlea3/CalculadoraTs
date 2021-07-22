import React from 'react';
import {Text, View} from 'react-native';
import {BotonCalc} from '../components/BotonCalc';
import {styles} from '../theme/appTheme';
import {useCalculadora} from '../hooks/useCalculadora';

export const CalculadoraScreen = () => {
  const {
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
  } = useCalculadora();

  return (
    <View style={styles.calculadoraCointainer}>
      {numeroAnterior !== '0' && (
        <Text style={styles.resultadoChico}> {numeroAnterior} </Text>
      )}
      <Text style={styles.resultado} numberOfLines={1} adjustsFontSizeToFit>
        {numero}
      </Text>

      {/* FILA DE BOTONES  */}
      <View style={styles.fila}>
        <BotonCalc texto="C" color="#9B9B9B" action={limpiar} />
        <BotonCalc texto="+/-" color="#9B9B9B" action={positivoNegativo} />
        <BotonCalc texto="del" color="#9B9B9B" action={btnDel} />
        <BotonCalc texto="/" color="#ff9427" action={btnDividir} />
      </View>

      <View style={styles.fila}>
        <BotonCalc texto="7" action={armarNumero} />
        <BotonCalc texto="8" action={armarNumero} />
        <BotonCalc texto="9" action={armarNumero} />
        <BotonCalc texto="X" color="#ff9427" action={btnMultiplicar} />
      </View>

      <View style={styles.fila}>
        <BotonCalc texto="4" action={armarNumero} />
        <BotonCalc texto="5" action={armarNumero} />
        <BotonCalc texto="6" action={armarNumero} />
        <BotonCalc texto="-" color="#ff9427" action={btnRestar} />
      </View>

      <View style={styles.fila}>
        <BotonCalc texto="1" action={armarNumero} />
        <BotonCalc texto="2" action={armarNumero} />
        <BotonCalc texto="3" action={armarNumero} />
        <BotonCalc texto="+" color="#ff9427" action={btnSumar} />
      </View>

      <View style={styles.fila}>
        <BotonCalc texto="0" ancho action={armarNumero} />
        <BotonCalc texto="." action={armarNumero} />
        <BotonCalc texto="=" color="#ff9427" action={calcular} />
      </View>
    </View>
  );
};
