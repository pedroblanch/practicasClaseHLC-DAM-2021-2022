import { Alumno } from "src/app/modelo/Alumno";

export interface InterfaceProvider {

    getAlumnos():Promise<Alumno[]>;

    eliminarAlumno(id: any): Promise<Boolean>;

    modificarAlumno(nuevosDatosAlumno: Alumno): Promise<Alumno>;

    insertarAlumno(datosNuevoAlumno: Alumno): Promise<Alumno>;

}