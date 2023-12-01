import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-Catatan',
  templateUrl: './Catatan.page.html',
  styleUrls: ['./Catatan.page.scss'],
})
export class CatatanPage implements OnInit {
  dataCatatan: any = [];
  id: number | null = null;
  judul_catatan: string = '';
  deskripsi_catatan: string = '';
  modal_tambah: boolean = false;
  modal_edit: boolean = false;

  constructor(
    private _apiService: ApiService,
    private modal: ModalController,
    private router: Router  // Injeksi Router
  ) {}

  ngOnInit() {
    this.getCatatan();
  }

  getCatatan() {
    this._apiService.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataCatatan = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  reset_model() {
    this.id = null;
    this.judul_catatan = '';
    this.deskripsi_catatan = '';
  }

  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }

  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }

  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilCatatan(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }

  tambahCatatan() {
    if (this.judul_catatan != '' && this.deskripsi_catatan != '') {
      let data = {
        judul: this.judul_catatan,
        deskripsi: this.deskripsi_catatan,
      };
      this._apiService.tambah(data, '/tambah.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log('berhasil tambah Catatan');
          this.getCatatan();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal tambah Catatan');
        },
      });
    } else {
      console.log('gagal tambah Catatan karena masih ada data yg kosong');
    }
  }

  hapusCatatan(id: any) {
    this._apiService.hapus(id, '/hapus.php?id=').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.getCatatan();
        console.log('berhasil hapus data');
      },
      error: (error: any) => {
        console.log('gagal');
      },
    });
  }

  ambilCatatan(id: any) {
    this._apiService.lihat(id, '/lihat.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let Catatan = hasil;
        this.id = Catatan.id;
        this.judul_catatan = Catatan.judul;
        this.deskripsi_catatan = Catatan.deskripsi;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      },
    });
  }

  editCatatan() {
    let data = {
      id: this.id,
      judul: this.judul_catatan,
      deskripsi: this.deskripsi_catatan,
    };
    this._apiService.edit(data, 'edit.php').subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getCatatan();
        console.log('berhasil edit Catatan');
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('gagal edit Catatan ' + err.message);
      },
    });
  }

  logout() {
    // Lakukan proses logout seperti membersihkan token atau sesi yang ada
    // Misalnya, menghapus token dari localStorage
    localStorage.removeItem('token-saya');
    localStorage.removeItem('namasaya');

    // Redirect ke halaman login
    this.router.navigate(['/login']);
  }
}
