# penjadwalan_tugas

ENDPOINT

[x] Membuat Proyek:
o Metode: POST
o Endpoint: /projects
o Request body: Objek JSON dengan name (string) dan description (string).
o Respon: Objek JSON dengan proyek yang dibuat, termasuk id.

[x] Mendapatkan Semua Proyek:
o Metode: GET
o Endpoint: /projects
o Respon: Array JSON dari semua proyek.

[x] Mendapatkan Proyek berdasarkan ID:
o Metode: GET
o Endpoint: /projects/:id
o Respon: Objek JSON dari proyek dengan id yang diberikan.

[x] Memperbarui Proyek:
o Metode: PUT
o Endpoint: /projects/:id
o Request body: Objek JSON dengan name (string) dan/atau description (string).
o Respon: Objek JSON dengan proyek yang diperbarui.

[x] Menghapus Proyek:
o Metode: DELETE
o Endpoint: /projects/:id
o Respon: Objek JSON dengan pesan konfirmasi penghapusan.

[ ] Membuat Tugas untuk Proyek:
o Metode: POST
o Endpoint: /projects/:projectId/tasks
o Request body: Objek JSON dengan title (string), description (string), startTime
(ISO 8601 string), dan endTime (ISO 8601 string).
o Respon: Objek JSON dengan tugas yang dibuat, termasuk id.

[ ] Mendapatkan Semua Tugas untuk Proyek:
o Metode: GET
o Endpoint: /projects/:projectId/tasks
o Respon: Array JSON dari semua tugas untuk proyek tersebut.

[ ] Memperbarui Tugas:
o Metode: PUT
o Endpoint: /tasks/:id
o Request body: Objek JSON dengan title (string), description (string), startTime
(ISO 8601 string), dan/atau endTime (ISO 8601 string).
o Respon: Objek JSON dengan tugas yang diperbarui.

[ ] Menghapus Tugas:
o Metode: DELETE
o Endpoint: /tasks/:id
o Respon: Objek JSON dengan pesan konfirmasi penghapusan.
