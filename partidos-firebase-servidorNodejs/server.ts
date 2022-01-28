const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');

const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

//cambiar el fichero de credenciales por el de cada alumno

const serviceAccount = require('./practica1firebase-335fe-firebase-adminsdk-nl675-7f1455234d.json');

initializeApp({

  credential: cert(serviceAccount)

});

//crea un timer que ejecuta código cada 10 segundos

const timerId = setInterval(() => {

  let now = new Date().getTime();

  let segundosDiff;

  let minutosJugados;

  const db = getFirestore();

  const partidosRef = db.collection('partidos');

  const snapshot = partidosRef.get()

    .then((data) => {

      let partidos = new Array();

      data.forEach(element => {

        let jsonobject=element.data();

        if(element.data()['horaInicioPartido']!=null

          && element.data()['horaFinPrimeraParte']==null){

          //en juego primera parte

          segundosDiff = (now - element.data()['horaInicioPartido']) / 1000;

          minutosJugados = Math.floor(segundosDiff / 60) + "'";

          jsonobject['minutosJugados']=minutosJugados;

          partidosRef.doc(element.data()['id']).update(jsonobject);

        }

        partidos.push(jsonobject);

      });

    })

    .catch((error) => {

      console.log(error.message);

    });

}, 10000);
