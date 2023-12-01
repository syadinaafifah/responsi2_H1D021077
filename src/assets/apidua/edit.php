<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input,true);

$id=trim($data['id']);
$judul_catatan=trim($data['judul_catatan']);
$deskripsi_catatan=trim($data['deskripsi_catatan']);
http_response_code(201);
if($judul_catatan!='' and $deskripsi_catatan!=''){
 $query = mysqli_query($koneksi,"update catatan set nama='$judul_catatan',deskripsi_catatan='$deskripsi_catatan' where 
id='$id'");
 $pesan = true;
}else{
 $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);
