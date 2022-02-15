import { Injectable } from '@angular/core';
import { AngularFirestore, Query, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Factura } from 'src/app/modelo/Factura';

@Injectable()
export class FireServiceProvider {

    private snapshotActual: QuerySnapshot<any>;
    private ref: Query;


    constructor(private angularFirestore: AngularFirestore) {
    }

    async getFacturas(numElementosPorPagina: number, accion: string): Promise<Factura[]> {
        switch (accion) {
            case 'inicio':
                this.ref = this.angularFirestore.collection('facturas').ref
                    .orderBy('cliente').limit(numElementosPorPagina);
                break;
            case 'siguiente':
                let lastDocumentInPage: QueryDocumentSnapshot<any>;
                lastDocumentInPage = this.snapshotActual.docs[this.snapshotActual.docs.length - 1];
                this.ref = this.angularFirestore.collection('facturas').ref
                    .orderBy('cliente').startAfter(lastDocumentInPage.data().cliente).limit(numElementosPorPagina);
                break;
            case 'anterior':
                let firstDocumentInPage: QueryDocumentSnapshot<any>;
                firstDocumentInPage = this.snapshotActual.docs[0];
                this.ref = this.angularFirestore.collection('facturas').ref
                    .orderBy('cliente').endBefore(firstDocumentInPage.data().cliente).limitToLast(numElementosPorPagina);
                break;
            case 'ultimo':
                let lastDocument: QueryDocumentSnapshot<any>;
                this.ref = this.angularFirestore.collection('facturas').ref
                    .orderBy('cliente','desc').limit(1);
                await this.ref.get()
                    .then((data) => {
                        lastDocument = data.docs[0];
                        this.ref = this.angularFirestore.collection('facturas').ref
                            .orderBy('cliente').endAt(lastDocument.data().cliente).limitToLast(numElementosPorPagina);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                break;
        }
        let promise = new Promise<Factura[]>((resolve, reject) => {
            this.ref.get()
                .then((data: QuerySnapshot<any>) => {
                    if (data.empty) {
                        //se pulsa anterior estando en la primera página
                        //o se pulsa siguiente estando en la última página
                        reject("Fuera de límites");
                        //si no pongo return se ejecuta el código posterior
                        return;
                    }
                    this.snapshotActual = data;
                    let facturas = new Array<Factura>();
                    data.forEach(element => {
                        let facturaJson = element.data();
                        let factura = Factura.createFromJsonObject(facturaJson);
                        facturas.push(factura);
                    });
                    resolve(facturas);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_getFacturas

}//end_class