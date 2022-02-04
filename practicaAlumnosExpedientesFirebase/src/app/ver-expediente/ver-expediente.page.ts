import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Alumno } from '../modelo/Alumno';
import { Expediente } from '../modelo/Expediente';
import { NuevoEspedientePage } from '../nuevo-espediente/nuevo-espediente.page';

@Component({
  selector: 'app-ver-expediente',
  templateUrl: './ver-expediente.page.html',
  styleUrls: ['./ver-expediente.page.scss'],
})


export class VerExpedientePage implements OnInit {

  @Input() alumnoJson;
  alumno: Alumno;
  modificadoExpediente: boolean = false;

  constructor(public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.alumno = Alumno.createFromJsonObject(JSON.parse(this.alumnoJson));
  }

  async nuevoExpediente() {

    const modal = await this.modalCtrl.create({
      component: NuevoEspedientePage,
      componentProps: {
        'alumnoJson': JSON.stringify(this.alumno)
      }
    });

    modal.onDidDismiss().then((dataAlumnoModificado) => {
      let alumnoModificado: Alumno = dataAlumnoModificado['data'];
      if (alumnoModificado != null) {
        this.alumno = alumnoModificado;
        this.modificadoExpediente = true;
      }
      else {
        //ha habido un error al insertar o se ha pulsado cancelar
        //no se hace nada
      }
    });
    return await modal.present();
  } //end_nuevoExpediente

  public closeModal() {
    if (this.modificadoExpediente) {
      //el alumno se ha modificado. Devuelvo el objeto alumno modificado
      this.modalCtrl.dismiss(this.alumno);
    }
    else{
      //el alumno no se ha modificado. No devuelvo datos
      this.modalCtrl.dismiss();
    }
  }

  verDocumento(indice: number) {
    console.log(this.alumno.expedientes[indice]);
  }


}//end_class
