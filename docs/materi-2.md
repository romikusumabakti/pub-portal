# **Materi 2: Markdown, Git, GitHub, dan NPM**

# Daftar isi

- [**Materi 2: Markdown, Git, GitHub, dan NPM**](#materi-2-markdown-git-github-dan-npm)
- [Daftar isi](#daftar-isi)
- [Markdown](#markdown)
  - [Menulis dokumen Markdown](#menulis-dokumen-markdown)
  - [Sintaks dasar](#sintaks-dasar)
    - [Judul](#judul)
    - [Gaya pada teks](#gaya-pada-teks)
    - [List](#list)
      - [Ordered list](#ordered-list)
      - [Unordered list](#unordered-list)
    - [Link](#link)
- [Git](#git)
  - [Mengatur nama dan email secara global](#mengatur-nama-dan-email-secara-global)
  - [Membuat repository Git lokal](#membuat-repository-git-lokal)
  - [Menambahkan file ke staging area](#menambahkan-file-ke-staging-area)
  - [Membuat commit baru](#membuat-commit-baru)
  - [Branch](#branch)
    - [Membuat branch](#membuat-branch)
    - [Beralih branch](#beralih-branch)
    - [Menggabungkan perubahan](#menggabungkan-perubahan)
  - [Perintah-perintah Git lain](#perintah-perintah-git-lain)
    - [`git clone`](#git-clone)
    - [`git fetch`](#git-fetch)
    - [`git revert`](#git-revert)
- [GitHub](#github)
  - [Mengapa tidak menggunakan GitLab?](#mengapa-tidak-menggunakan-gitlab)
  - [Menambahkan file README](#menambahkan-file-readme)
  - [Menghubungkan repository lokal ke GitHub](#menghubungkan-repository-lokal-ke-github)
- [NPM (Node Package Manager)](#npm-node-package-manager)
  - [Menginstal package](#menginstal-package)
  - [Package yang paling banyak digunakan](#package-yang-paling-banyak-digunakan)
  - [Chalk](#chalk)
    - [Instalasi](#instalasi)
    - [Penggunaan](#penggunaan)
- [React](#react)
  - [React bukanlah framework](#react-bukanlah-framework)
  - [Instalasi](#instalasi-1)


# Markdown

Markdown adalah format dokumen yang paling banyak digunakan oleh para developer, termasuk programmer.

Markdown biasa digunakan untuk:
- Menulis dokumentasi bahasa pemrograman, library, atau framework
- Menulis file README di GitHub
- Menulis pertanyaan dan jawaban di Stack Overflow
- Menulis postingan di Reddit (forum diskusi developer)
- Menulis postingan di DEV Community (blog komunitas developer)
- Menulis pesan di Slack dan Discord (aplikasi komunikasi dan kolaborasi tim dalam mengerjakan project)

Selain untuk keperluan development seperti di atas, Markdown juga dapat digunakan untuk menulis buku, email, dll.

Bahkan materi ini juga ditulis menggunakan Markdown.

## Menulis dokumen Markdown

Markdown dapat dibuat menggunakan aplikasi apapun, bahkan Notepad. Tapi kita akan menggunakan VS Code, karena ada sejumlah fitur khusus Markdown yang akan membantu kita menjadi lebih produktif, terutama fitur preview.

Buat file dengan ekstensi .md.

## Sintaks dasar

### Judul

Untuk membuat judul (heading), tambahkan 1-6 simbol # sebelum teks judul. Jumlah yang # kita gunakan akan menentukan ukuran judul.

| Ukuran  | Sintaks          | Output           |
| ------- | ---------------- | ---------------- |
| Judul 1 | `# Judul 1`      | <h1>Judul 1</h1> |
| Judul 2 | `## Judul 1`     | <h2>Judul 2</h2> |
| Judul 3 | `### Judul 1`    | <h3>Judul 3</h3> |
| Judul 4 | `#### Judul 1`   | <h4>Judul 4</h4> |
| Judul 5 | `##### Judul 1`  | <h5>Judul 5</h5> |
| Judul 6 | `###### Judul 1` | <h6>Judul 6</h6> |

### Gaya pada teks

| Gaya    | Sintaks    | Output   |
| ------- | ---------- | -------- |
| Tebal   | `**teks**` | **teks** |
| Miring  | `*teks*`   | *teks*   |
| Dicoret | `~~teks~~` | ~~teks~~ |

### List

#### Ordered list

```md
1. Titik
2. Lulu
3. Indah
4. Cahaya
5. Risa
```

Output:

> 1. Titik
> 2. Lulu
> 3. Indah
> 4. Cahaya
> 5. Risa

#### Unordered list

```md
- Titik
- Lulu
- Indah
- Cahaya
- Risa
```

Output:

> - Titik
> - Lulu
> - Indah
> - Cahaya
> - Risa

### Link

```md
[Buka Google](https://www.google.com)
```

Output:
> [Buka Google](https://www.google.com)

Sumber: [https://www.markdownguide.org/basic-syntax/](https://www.markdownguide.org/basic-syntax/)

# Git

Git adalah sistem kontrol versi terdistribusi gratis dan open source. Sistem kontrol versi digunakan untuk melacak riwayat perubahan saat orang dan tim berkolaborasi dalam project bersama. Jika kita membuat perubahan pada project, versi project sebelumnya dapat dipulihkan kapan saja.

Kita dapat meninjau riwayat project untuk mengetahui:

- Perubahan apa saja yang dilakukan?
- Siapa yang membuat perubahan?
- Kapan perubahan dilakukan?
- Mengapa perubahan diperlukan?

## Mengatur nama dan email secara global

Kita perlu mengatur nama dan email secara global. Global artinya berlaku untuk semua repository di komputer kita.

> Nama bukanlah username, biasanya berupa nama lengkap kita, dapat mengandung spasi

> Email ini nantinya digunakan untuk login ke GitHub

1. Buka terminal
2. Atur nama pengguna dan email:
   ```shell
   $ git config --global user.name "Yoga Hendrapratama"
   $ git config --global user.email yhepra@gmail.com
   ```
3. Periksa apakah kita berhasil mengaturnya:
   ```shell
   $ git config --global user.name
   Yoga Hendrapratama

   $ git config --global user.email
   yhepra@gmail.com
   ```

## Membuat repository Git lokal

Buat folder baru yang akan dijadikan repository. Penamaan standarnya huruf kecil semua, setiap kata dipisahkan oleh tanda hubung (-). Misalnya `latihan-1`.

Buka terminal (misalnya Windows PowerShell, Command Prompt (CMD), Git Bash, dll.) di folder itu. Inisialisasi repository Git dengan perintah berikut.

```shell
> git init
```

Buat file baru, misalnya `file1.md` dan `file2.md`. Tulis beberapa teks di file tersebut.

## Menambahkan file ke staging area

Tambahkan file-file akan kita commit ke dalam staging area dengan perintah berikut.

```shell
> git add file1.md file2.md
```

Atau untuk menambahkan semua file di folder itu, kita bisa menggunakan simbol titik (.).

```shell
> git add .
```

Untuk memeriksa file apa saja yang sudah masuk staging area, kita bisa menggunakan perintah berikut.

```shell
> git status
```

## Membuat commit baru

```shell
> git commit -m "commit pertama"
```

## Branch

Setiap repository yang kita buat akan memiliki 1 branch (cabang) dengan nama `master`. Ini adalah branch utama.

Kita perlu branch lain jika ingin menambahkan fitur, memperbaiki bug, atau bereksperimen dengan aman tanpa memengaruhi project di branch utama.

### Membuat branch

Gunakan perintah `git branch` untuk membuat branch baru, misalnya `fitur1`.

```shell
> git branch fitur1
```

### Beralih branch

Gunakan perintah `git checkout` untuk beralih ke branch lain.

```shell
> git checkout fitur1
```

Setelah beralih ke branch tersebut, kita bebas melakukan perubahan apapun tanpa mempengaruhi branch utama.

### Menggabungkan perubahan

Jika kita sudah yakin dengan perubahan yang kita lakukan, kita dapat menggabungkannya ke branch utama.

Pindah ke branch utama dulu.

```shell
> git checkout master
```

Gabungkan perubahan di branch `fitur1` ke branch utama.

```shell
> git merge fitur1
```

## Perintah-perintah Git lain

### `git clone`

Mendownload versi terbaru dari repository remote.

```shell
> git clone alamat-repository.git
```

### `git fetch`

Mendapatkan pembaruan dari repository remote.

```shell
> git fetch
```

### `git revert`

Membatalkan perubahan dan kembali ke keadaan commit tertentu.

```shell
> git revert kode-hash-commit
```

Sumber: [https://docs.github.com/en/get-started/using-git/about-git](https://docs.github.com/en/get-started/using-git/about-git)

# GitHub

GitHub adalah tempat meng-hosting repository Git.

## Mengapa tidak menggunakan GitLab?

GitLab bagus. Tapi masih kalah populer dari GitHub. Dunia kerja lebih banyak menggunakan GitHub. Jadi untuk pelatihan ini kita akan menggunakan GitHub.

## Menambahkan file README

Kita perlu menambahkan file README ke repository untuk menyampaikan informasi penting tentang project kita.

README adalah item pertama yang dilihat pengunjung saat mengunjungi repository kita. File README biasanya menyertakan informasi tentang:

- Apa yang dilakukan project
- Mengapa project ini berguna
- Bagaimana cara pengguna dapat memulai project
- Di mana pengguna bisa mendapatkan bantuan dengan project kita
- Siapa yang memelihara dan berkontribusi pada project

## Menghubungkan repository lokal ke GitHub

Klik tombol ikon plus (+) di kanan atas, lalu pilih New repository.

![](gambar/20220611185710.png)

Masukkan nama repository, sebaiknya sama dengan nama repository lokal yang akan kita hubungkan. Misalnya `latihan-1`.

![](gambar/20220611185542.png)

Field yang lain biarkan saja. Kalau sudah, klik tombol Create repository.

![](gambar/20220611190019.png)

Maka seharusnya akan muncul tampilan seperti berikut.

![](gambar/20220611190220.png)

Kita berhasil membuat repository kosong. Sekarang saatnya menghubungkannya dengan repository lokal yang ada di komputer kita.

Buka terminal di repository lokal kita. Tambahkan alamat repository remote (GitHub) sebagai origin dari repository lokal kita.

```shell
> git remote add origin https://github.com/romikusumabakti/latihan-1.git
```

Sebagaimana direkomendasikan oleh GitHub, ubah nama branch dari `master` menjadi `main`.

```shell
> git branch -M main
```

Push (kirim) semua perubahan dari branch `main` ke repository GitHub.

```shell
> git push -u origin main
```

# NPM (Node Package Manager)

NPM adalah package manager (manajer paket) untuk Node.js.

Package manager adalah sistem untuk mengelola dependensi project kita.

Package manager akan menyediakan metode untuk menginstal dependensi baru (juga disebut sebagai "package"), mengelola di mana package disimpan di sistem file kita, dan memungkinkan kita untuk menerbitkan package kita sendiri.

Sumber: [https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Package_management](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Package_management)

Misalnya package manager untuk Java adalah Maven. Package manager untuk .NET adalah NuGet. Sedangkan package manager untuk PHP adalah Composer.

## Menginstal package

```shell
> npm install nama-package
```

Atau lebih singkatnya:

```shell
> npm i nama-package
```

## Package yang paling banyak digunakan

- React
- Express

## Chalk

Chalk adalah package Node.js yang cukup populer. Kita akan menggunakannya untuk latihan.

Chalk adalah library untuk memberi style pada teks yang keluar di terminal, misalnya warna, tebal, garis bawah, dll.

### Instalasi

```shell
> npm i chalk
```

### Penggunaan

```js
import chalk from 'chalk';

console.log(chalk.blue('Hello world!'));
```

Selengkapnya: [https://github.com/chalk/chalk](https://github.com/chalk/chalk)

# React

## React bukanlah framework

Tidak seperti Vue dan Angular, React bukanlah framework. Seperti halnya Chalk yang kita pakai sebelumnya, React hanya sebuah library. React hanya peduli dengan manajemen status dan merender status itu ke DOM, jadi membuat aplikasi React biasanya memerlukan penggunaan library tambahan untuk routing, serta fungsionalitas sisi klien tertentu.

## Instalasi

```shell
> npm i react
> npm i react-dom
```