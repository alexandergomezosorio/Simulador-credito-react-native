import { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-web';


export default function App() {
  //Capturar datos
  const [nombre, setNombre] = useState();
  const [montoPrestamo, setMontoPrestamo] = useState();
  const [numeroCuotas, setNumeroCuotas] = useState();
  const [fecha, setFecha] = useState(new Date().toLocaleDateString());
  const [tipoPrestamo, setTipoPrestamo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mensajePositivo, setMensajePositivo] = useState('');
  const [arreglo, setArreglo] = useState([]);
  //Mostrar datos
  const [valorCuota, setValorCuota] = useState(0);
  const [totalDeuda, setTotalDeuda] = useState(0);

  const buscar = () => {

    let objetoNombre = arreglo.find(i => i.nombre == nombre);
    if (objetoNombre != undefined) {
      setMontoPrestamo(objetoNombre.montoPrestamo);
      setTipoPrestamo(objetoNombre.tipoPrestamo);
      setValorCuota(objetoNombre.cuota);
      setNumeroCuotas(objetoNombre.numeroCuotas);
      setTotalDeuda(objetoNombre.total);
      setFecha(objetoNombre.fecha);
      setMensajePositivo(objetoNombre.mensajePositivo);

      setMensaje('');
      setMensajePositivo('Se encontro usuario');

    } else {
      setMensajePositivo('');
      setMensaje('Usuario no existe');
    }
  }
  let simular = (op) => {

    let total = 0;
    let porcentaje = 0;
    let cuota = 0;

    switch (op) {
      case 'calcular':

        if (nombre != "") {

          if (montoPrestamo != "") {

            if (montoPrestamo >= 1000000 && montoPrestamo <= 100000000 && montoPrestamo >= 1000000 && montoPrestamo <= 100000000) {

              if (numeroCuotas != "") {
                if (numeroCuotas >= 12 && numeroCuotas <= 36) {
                  //if (fecha != "") {

                    if (tipoPrestamo != "") {
                      if (tipoPrestamo == 'vivienda' || tipoPrestamo == 'educacion' || tipoPrestamo == 'libre inversion') {
                        setMensaje('');
                        setMensajePositivo('Simulando Crédito');
                        

                        if (tipoPrestamo == 'vivienda') {
                          porcentaje = (parseFloat(montoPrestamo) * 0.015);
                        }

                        if (tipoPrestamo == 'educacion') {
                          porcentaje = (parseFloat(montoPrestamo) * 0.010);
                        }

                        if (tipoPrestamo == 'libre inversion') {
                          porcentaje = (parseFloat(montoPrestamo) * 0.020);
                        }
                        
                        total = parseFloat(montoPrestamo) + porcentaje;
                        cuota = total / parseInt(numeroCuotas);

                        setTotalDeuda(total.toFixed(0));
                        setValorCuota(cuota.toFixed(0));

                        let array = { nombre, montoPrestamo, numeroCuotas, tipoPrestamo, fecha, cuota, total }
                        setArreglo([...arreglo, array]);
                      
                      }
                      else {
                        setMensaje('Debe ingresar un tipo de prestamo valido:  (vivienda,educacion o libre inversion) ');
                      }
                    }
                    else {
                      setMensaje('Campo: Tipo de préstamo no puede estar vacio');
                    }
                  /* } else {
                    setMensaje('Campo Fecha: no puede estar vacio');
                  } */
                } else {
                  setMensaje('Campo Número Cuotas: deben de estar entre 12 y 36 Cuotas');
                }
              } else {
                setMensaje('Campo Número Cuotas: no puede estar vacio ');
              }
            } else {
              setMensaje('Campo Monto Préstamo: debe estar entre un millon y cien millones');
            }
          } else {
            setMensaje('Campo: Monto Préstamo no puede estar vacio ');
          }
        } else {
          setMensaje('Campo: Nombre no puede estar vacio');
        }
        break;

      case 'limpiar':
        setNombre('');
        setMontoPrestamo('');
        setNumeroCuotas('');
        setValorCuota('');
        setTipoPrestamo('');
        setTotalDeuda('');
        setMensajePositivo('');
        setMensaje('');
        break;

      case 'buscar':
        if (nombre != "") {
          buscar();
        } else {
          setMensaje('Campo: Nombre no puede estar vacio para hacer la busqueda');
        }
        break;
    }
  }

  return (

    <View style={{ flexWrap: 'wrap', width: '75%', height: '100%' }}>

      <View style={{ marginLeft: '10%', alignItems: 'center', backgroundColor: '#ffe4c4', marginTop: '8%', borderColor: 'black', height: '6%' }}>
        <Text style={{ fontSize: 35 }}>Simulador de Crédito</Text>
      </View>
      <View style={{ flexDirection: 'row', width: '90%', height: '45%', marginLeft: '10%', marginTop: 30 }}>

        <View style={{ backgroundColor: '#CEF6D8', width: '70%' }}>
          <View style={{ flexDirection: 'row', marginTop: 40, marginLeft: 5 }}>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 110 }} >Nombre</Text>

            <TextInput
              placeholder=' ____________________________'
              onChangeText={nombre => setNombre(nombre)}
              value={nombre}>

            </TextInput>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 80, marginRight: 120 }} >Fecha</Text>

            <TextInput placeholder=' ____________________________'
              onChangeText={fecha => setFecha(fecha)}
              value={fecha}>
            </TextInput>


          </View>

          <View style={{ flexDirection: 'row', marginTop: 40, marginLeft: 5 }}>


            <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 30 }} >Monto Préstamo </Text>

            <TextInput placeholder='____________________________'
              onChangeText={montoPrestamo => setMontoPrestamo(montoPrestamo)}
              value={montoPrestamo}>
            </TextInput>


            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 70, marginRight: 45 }} >Tipo Préstamo</Text>

            <TextInput style={{ marginRight: 10 }} placeholder='____________________________'
              onChangeText={tipoPrestamo => setTipoPrestamo(tipoPrestamo)}
              value={tipoPrestamo}>

            </TextInput>

          </View>

          <View style={{ flexDirection: 'row', marginTop: 40, marginLeft: 5 }}>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 13 }} >Número de Cuotas </Text>

            <TextInput placeholder='____________________________'
              onChangeText={numeroCuotas => setNumeroCuotas(numeroCuotas)}
              value={numeroCuotas}>

            </TextInput>

          </View>

          <View style={{ flexDirection: 'row', marginTop: 40, marginLeft: 5 }}>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 55 }} >Valor de Cuota</Text>

            <TextInput 
              value={new Intl.NumberFormat('es-CO').format(valorCuota)}>
            </TextInput>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 70, marginRight: 65, }} >Total Deuda</Text>

            <TextInput 
              value={new Intl.NumberFormat('es-CO').format(totalDeuda)} >
            </TextInput>

          </View>
        </View>
        <View style={{ backgroundColor: '#CEF6D8', width: '30%', alignItems: 'center' }}>

          <TouchableOpacity
            style={{ backgroundColor: '#688A08', marginTop: 80, width: '50%', height: '10%', marginRight: 80 }}
            onPress={() => simular('calcular')}>
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 20, padding: 5 }}>Calcular/Guardar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: '#688A08', marginTop: 20, width: '50%', height: '10%', marginRight: 80 }}
            onPress={() => simular('buscar')}>
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 20, padding: 5 }}>Buscar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: '#688A08', marginTop: 20, width: '50%', height: '10%', marginRight: 80 }}
            onPress={() => simular('limpiar')}>
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 20, padding: 5 }}>Limpiar</Text>
          </TouchableOpacity>

          <View style={{ backgroundColor: 'red', marginTop: 30, marginRight: 75, borderRadius: 5 }}>
            <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', padding: 1 }}>{mensaje}</Text>
          </View>

          <View style={{ backgroundColor: '#31B404', marginTop: 30, marginRight: 75, borderRadius: 5 }}>
            <Text style={{ color: 'white', fontSize: 23, textAlign: 'center', padding: 1 }}>{mensajePositivo}</Text>
          </View>

        </View>
      </View>
    </View>

  );
}



