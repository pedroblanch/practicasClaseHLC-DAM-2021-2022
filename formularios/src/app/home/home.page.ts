import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Gender } from '../modelo/Gender';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  matching_passwords_group: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private navCtrl: NavController) { }

  validations_form: FormGroup;
  genders: Gender[];

  ngOnInit() {

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.maxLength(15),
        Validators.minLength(8),
        Validators.pattern('^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.,-]).*$'),
        Validators.required
      ])),
      confirmPassword: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return this.confirmPassword(formGroup);
    });

    this.genders = Object.values(Gender);

    this.validations_form = this.formBuilder.group({
      matching_passwords: this.matching_passwords_group,
      username: new FormControl('', Validators.compose([
        this.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z]{1}[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+[@]{1}[a-zA-Z0-9-]+[.]{1}[a-zA-Z]+$')
      ])),
      gender: new FormControl('', Validators.required),
      terms: new FormControl(false, Validators.pattern('true'))
    });
  }//end_ngOnInit

  confirmPassword(fg: FormGroup) {
    if (fg.controls['password'].value != fg.controls['confirmPassword'].value)
      return ({ confirmPassword: true });  //no valida
    else
      return (null);  //si son iguales lo valida
  }



  validUsername(fc: FormControl) {
    //si es válido devuelve null
    //si no es válido devuelve {vaidusername: true}
    if (fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "cba321") {
      return (null);
    } else {
      return ({ validUsername: true });
    }
  }

  onSubmit(values) {
    console.log(values.username);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(values),
        numero: 3
      }
    };
    this.navCtrl.navigateForward('/user', navigationExtras);
  }

}//end_Class
