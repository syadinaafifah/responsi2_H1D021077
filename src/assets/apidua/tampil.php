<?php
require 'koneksi.php';
$data = [];
$query = mysqli_query($koneksi,"select * from catatan");
while ($row = mysqli_fetch_object($query)) {
$data[] = $row;
}

echo json_encode($data);
echo mysqli_error($koneksi);
