import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FireServiceProvider } from 'src/providers/api-service/fire-service';
import { Alumno } from '../modelo/Alumno';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.page.html',
  styleUrls: ['./editar-alumno.page.scss'],
})
export class EditarAlumnoPage implements OnInit {

  @Input() alumnoJson;
  alumno: Alumno;
  validations_form: FormGroup;

  constructor(public formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    public apiService: FireServiceProvider) { }

  ngOnInit() {
    //los datos del alumno llegan como un objeto JSON pasado como cadena
    //hay que parsearlo y transformarlo en un objeto Alumno
    this.alumno = Alumno.createFromJsonObject(JSON.parse(this.alumnoJson));
    this.validations_form = this.formBuilder.group({
      first_name: new FormControl(this.alumno.first_name, Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(1),
        Validators.pattern('^[a-z A-ZáéíóúÁÉÍÓÚ]+$'),
        Validators.required
      ])),
      last_name: new FormControl(this.alumno.last_name, Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(1),
        Validators.pattern('^[a-z A-ZáéíóúÁÉÍÓÚ]+$'),
        Validators.required
      ])),
      email: new FormControl(this.alumno.email, Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+[@]{1}[a-zA-Z0-9-]+[.]{1}[a-zA-Z]+$'),
        Validators.required
      ])),
      address: new FormControl(this.alumno.address, Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(1),
        Validators.pattern('^[a-z A-ZáéíóúÁÉÍÓÚ0-9]+$'),
        Validators.required
      ])),
      city: new FormControl(this.alumno.city, Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(1),
        Validators.pattern('^[a-z A-ZáéíóúÁÉÍÓÚ]+$'),
        Validators.required
      ])),
      avatar: new FormControl(this.alumno.avatar, Validators.required),
      gender: new FormControl(this.alumno.gender, Validators.compose([
        Validators.required
      ]))
    });
  }

  onSubmit(values) {
    this.alumno.first_name = values['first_name'];
    this.alumno.last_name = values['last_name'];
    this.alumno.email = values['email'];
    this.alumno.address = values['address'];
    this.alumno.city = values['city'];
    this.alumno.avatar = values['avatar'];
    this.alumno.gender = values['gender'];
    this.modalCtrl.dismiss(this.alumno);  
    //los valores son correctos. 
    //Se devuekve un objeto Alumno con los datos del formulario.
    //el id del objeto no se cambia. Si estoy añadiendo nuevos datos es null.
    //si estoy modificando datos es el id que tenía ya el objeto Alumno.
  }

  public closeModal() {
    this.modalCtrl.dismiss();  //se cancela la edición. No se devuelven datos.
  }

  uploadImage(event: FileList){
    var file:File=event.item(0);
    var extension = file.name.substr(file.name.lastIndexOf('.') + 1);
    //doy al nombre del fichero un número aleatorio 
    //le pongo al nombre también la extensión del fichero
    var fileName= `${new Date().getTime()}.${extension}`;
    this.validations_form.controls.avatar.setValue("");
    this.apiService.uploadImage(file,fileName)
    .then( (downloadUrl)=>{
      this.alumno.avatar=downloadUrl;
      this.validations_form.controls.avatar.setValue(downloadUrl);
    })
    .catch((error)=>{
      console.log(error);
    });
  }
}
