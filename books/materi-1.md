# **Materi 1: Node.js dan konsep JavaScript**

# Daftar isi

- [**Materi 1: Node.js dan konsep JavaScript**](#materi-1-nodejs-dan-konsep-javascript)
- [Daftar isi](#daftar-isi)
- [Pendahuluan](#pendahuluan)
  - [Apa saja yang perlu disiapkan?](#apa-saja-yang-perlu-disiapkan)
- [Node.js](#nodejs)
  - [Menjalankan program](#menjalankan-program)
- [Mengingat kembali JavaScript](#mengingat-kembali-javascript)
  - [Mengapa perlu belajar JavaScript?](#mengapa-perlu-belajar-javascript)
  - [Konsep-konsep dasar yang mungkin kita lewatkan](#konsep-konsep-dasar-yang-mungkin-kita-lewatkan)
    - [Anonymous function](#anonymous-function)
    - [Arrow function](#arrow-function)
- [Konsep-konsep JavaScript modern](#konsep-konsep-javascript-modern)
  - [Callback function](#callback-function)
  - [Method-method pada array](#method-method-pada-array)
    - [`map()`](#map)
    - [`filter()`](#filter)
    - [`find()`](#find)
  - [Sintaks spread (`...`)](#sintaks-spread-)
  - [Destructuring assignment](#destructuring-assignment)
    - [Array destructuring](#array-destructuring)
    - [Object destructuring](#object-destructuring)
  - [Operator kondisional (ternary)](#operator-kondisional-ternary)
  - [Operator logika](#operator-logika)
    - [AND (`&&`)](#and-)
    - [OR (`||`)](#or-)
  - [Optional chaining](#optional-chaining)
  - [Asynchronous](#asynchronous)

# Pendahuluan

React adalah library JavaScript untuk mempermudah kita dalam membangun UI (user interface) web. Di antara alat lainnya seperti Vue dan Angular, React adalah yang paling populer.

## Apa saja yang perlu disiapkan?

Sebelum belajar React, kita harus memahami dulu tentang:
- Penggunaan editor kode (Visual Studio Code)
- Dasar-dasar web development (HTML, CSS, dan JavaScript)
- Konsep-konsep JavaScript modern
- Runtime dan package manager JavaScript (Node.js dan NPM)
- Sistem kontrol versi (Git dan GitHub) dan Markdown

Sumber:
- [https://dev.to/stephanieopala/what-to-learn-before-learning-react-1a6h](https://dev.to/stephanieopala/what-to-learn-before-learning-react-1a6h)
- [https://www.geeksforgeeks.org/top-5-skills-you-must-know-before-you-learn-reactjs/](https://www.geeksforgeeks.org/top-5-skills-you-must-know-before-you-learn-reactjs/)

# Node.js

Node.js adalah runtime JavaScript yang dibuat di atas mesin JavaScript V8 Chrome.

Runtime adalah software yang memungkinkan program bahasa pemrograman tertentu bisa berinteraksi dengan sistem. Misalnya runtime untuk .NET adalah CLR (sudah termasuk dalam .NET Framework). Runtime untuk Java adalah JVM (sudah termasuk dalam JDK). Sedangkan runtime untuk PHP adalah Zend Engine, tapi biasanya kita menggunakan XAMPP.

Node.js sebenarnya berasal dari mesin JavaScript yang bernama V8 yang tertanam di browser yang sering kita pakai, Google Chrome.

Sebelum adanya Node.js, JavaScript hanya bisa berjalan di lingkungan browser, tidak dapat berinteraksi dengan sistem, termasuk basis data, dll.

Sejak adanya Node.js, yang awalnya JavaScript hanya sebuah bahasa pemrograman web, kini JavaScript telah menjadi bahasa pilihan nomor 1 untuk back-end development.

## Menjalankan program

```shell
> node nama-file.js
```

Atau tanpa ekstensi:

```shell
> node nama-file
```

Jika berada di dalam folder:

```shell
> node nama-folder/nama-file
```

Khusus untuk file bernama `index.js` kita bisa menggunakan lokasi foldernya saja.

```shell
> node nama-folder
```

Jika file `index.js` itu berada di folder saat ini maka menggunakan simbol titik (`.`).

```shell
> node .
```

# Mengingat kembali JavaScript

## Mengapa perlu belajar JavaScript?

JavaScript adalah pilihan yang sangat tepat dan layak dipelajari. Mengapa?

- Bahasa wajib web development, library dan framework front-end populer seperti React/Next.js, Vue, dan Angular, semuanya menggunakan JavaScript
- Back-end terfavorit saat ini adalah Node.js, bukan Python, Go, apalagi Java
- Mobile development saat ini kebanyakan menggunakan React Native (framework JavaScript), mengalahkan Java dan Kotlin
- Desktop development saat ini kebanyakan menggunakan Electron (framework JavaScript), mengalahkan .NET (C#), bahkan VS Code buatan Microsoft yang sering kita pakai juga dibuat menggunakan Electron
- Sintaksnya mudah dipelajari
- Dapat berjalan tanpa menginstal apapun (di web browser)
- Sumber belajar ada di mana-mana, dokumentasinya lengkap dan mudah dibaca

Kesimpulan:
- JavaScript menjadi pemenang di hampir semua jenis development (web, back-end, mobile, dan desktop)
- Dengan kemudahan sintaks dan banyaknya sumber belajar, JavaScript menyenangkan untuk dipelajari

> **Bagaimana dengan game development?**
> 
> Pemenang di game development saat ini adalah C++ dan C#. Tapi bukan berarti JavaScript tidak dapat digunakan untuk itu.
>
> Lihat: [https://phaser.io/](https://phaser.io/)

## Konsep-konsep dasar yang mungkin kita lewatkan

Sebelum belajar React, kita harus terlebih dahulu memahami metode dan konsep dasar JavaScript. Kalau tidak, itu seperti anak kecil yang langsung belajar berlari sebelum belajar berjalan.

### Anonymous function

Anonymous function adalah function yang tidak memiliki nama. Biasanya function ini merupakan nilai dari variabel/konstanta atau sebagai argumen dari function lain.

Contoh sebagai nilai konstanta:

```js
const welcome = function () {
  console.log('Selamat datang!');
};

// dipanggil menggunakan nama konstanta
welcome();
```

Contoh sebagai argumen pada pemanggilan function lain:

```js
// memanggil fungsi1() dengan argumen berupa anonymous function
fungsi1(function () {
  console.log('Hello world!');
});
```

### Arrow function

Arrow function (fungsi panah) adalah bentuk alternatif yang lebih ringkas dari pernyataan traditional function, tetapi terbatas dan tidak dapat digunakan di semua situasi. Arrow function selalu berupa anonymous function.

Contoh traditional anonymous function:
```js
function (name) {
  return 'Selamat datang ' + name;
}
```

Untuk mengubahnya menjadi arrow function, hilangkan kata `function` dan tambahkan `=>` di antara tutup kurung dan buka kurung kurawal.

```js
(name) => {
  return 'Selamat datang ' + name;
}
```

Function di atas hanya memiliki 1 statement, sehingga kurung kurawalnya bisa dihilangkan. Dalam menghapus kurung kurawal, jika statement itu berupa pengembalian (return), maka kata `return` juga harus dihilangkan seperti berikut.

```js
(name) => 'Selamat datang ' + name;
```

Function di atas hanya memiliki 1 parameter, sehingga kurungnya bisa dihilangkan seperti berikut.

```js
name => 'Selamat datang ' + name;
```

Untuk memberi nama pada arrow function di atas, simpan function itu ke sebuah variabel/konstanta.

```js
const welcome = name => 'Selamat datang ' + name;
```

Untuk memanggil function di atas, kita bisa menggunakan nama variabel/konstantanya.

```js
welcome('Imron Fuadi');
// hasil return: Selamat datang Imron Fuadi
```

Sumber: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

# Konsep-konsep JavaScript modern

React dibangun menggunakan fitur JavaScript modern. Ada beberapa konsep JavaScript modern yang perlu kita ketahui sebelum belajar React.

Sumber: [https://www.freecodecamp.org/news/top-javascript-concepts-to-know-before-learning-react/](https://www.freecodecamp.org/news/top-javascript-concepts-to-know-before-learning-react/)

## Callback function
Callback function adalah function yang diteruskan ke function lain sebagai argumen, yang kemudian dipanggil di dalamnya.

Contoh:

```js
function fungsi1(callback) {
  console.log('Halo');
  callback();
}

function fungsi2() {
  console.log('Hai');
}

fungsi1(fungsi2);

// output:
// Halo
// Hai
```

Sumber: [https://developer.mozilla.org/en-US/docs/Glossary/Callback_function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)

## Method-method pada array

Method adalah function dari sebuah objek atau class. Array memiliki banyak method, tapi ada 3 method yang penting untuk dipelajari sebelum belajar React, yaitu `map()`, `filter()`, dan `find()`.

### `map()`

Method `map()` mengembalikan array baru yang berisi sekumpulan nilai baru untuk tiap-tiap elemennya.

Method `map()` membutuhkan argumen berupa function yang mengembalikan nilai baru tersebut.

Contoh:

```js
const numbers = [1, 4, 9, 16];
const newNumbers = numbers.map(number => number * 2);
console.log(newNumbers);

// output: [ 2, 8, 18, 32 ]
```

Sumber: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

### `filter()`

Method `filter()` mengembalikan array baru yang berisi semua elemen yang memenuhi kondisi. Jika tidak ada nilai yang memenuhi kondisi maka akan mengembalikan array kosong.

Method `filter()` membutuhkan argumen berupa function yang mengembalikan kondisi untuk menguji tiap-tiap elemen pada array tersebut.

Contoh:

```js
const people = ['Agus', 'Aren', 'Ari Sandi', 'Awaludin', 'Arie Akbar'];
const newPeople = people.filter(person => person.length > 6);
console.log(newPeople);

// output: [ 'Ari Sandi', 'Awaludin', 'Arie Akbar' ]
```

Sumber: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

### `find()`

Method `find()` mengembalikan elemen pertama dari array yang memenuhi kondisi. Jika tidak ada nilai yang memenuhi kondisi, maka akan mengembalikan `undefined`.

```js
const numbers = [5, 12, 8, 130, 44];
const found = numbers.find(number => number > 10);
console.log(found);

// output: 12
```

Sumber: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

## Sintaks spread (`...`)

Sintaks spread (`...`) adalah pernyataan untuk mengeluarkan semua elemen array untuk dimasukkan ke array baru.

Contoh:

```js
let numbers = [0, 1, 2];
let newNumber = [...numbers, 12];
console.log(newNumbers);

// output: [ 0, 1, 2, 12 ]
```

Sumber: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

## Destructuring assignment

Sintaks destructuring assignment adalah pernyataan untuk mengeluarkan nilai dari array atau properti dari objek untuk dimasukkan ke variabel lain.

### Array destructuring

```js
let a, b;
[a, b] = [10, 20];

console.log(a);
// output: 10

console.log(b);
// output: 20
```

### Object destructuring

```js
let mahasiswa = {
  nama: 'Ari Sandi Shefa Maldini',
  umur: 20
}

let {nama, umur} = mahasiswa;

console.log(nama);
// output: Ari Sandi Shefa Maldini

console.log(umur);
// output: 20
```

Sumber: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

## Operator kondisional (ternary)

```js
function tagihan(anggota) {
  return (anggota ? 'Rp30.000' : 'Rp150.000');
}

console.log(tagihan(true));
// output: Rp30.000

console.log(tagihan(false));
// output: Rp150.000

console.log(tagihan(null));
// output: Rp150.000
```

Sumber: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

## Operator logika

### AND (`&&`)

Jika kiri bernilai `false`, `null`, atau `undefined`, maka akan mengembalikan nilai itu sendiri (nilai kiri).

Jika kiri bernilai selain nilai-nilai di atas, maka akan mengembalikan nilai kanan.

Contoh:

```js
let nama = null;
console.log(nama && 'Mita');
// output: null
```

```js
let nama = 'Aren';
console.log(nama && 'Mita');
// output: Mita
```

### OR (`||`)

Jika kiri bernilai `false`, `null`, atau `undefined`, maka akan mengembalikan nilai kanan.

Jika kiri bernilai selain nilai-nilai di atas, maka akan mengembalikan nilai itu sendiri (nilai kiri).

Contoh:

```js
let nama = null;
console.log(nama || 'Mita');
// output: Mita
```

```js
let nama = 'Aren';
console.log(nama || 'Mita');
// output: Aren
```

## Optional chaining

Operator optional chaining (`?.`) dapat mencegah pembacaan nilai properti jika objeknya tidak ada, sehingga tidak akan terjadi error.

```js
const mahasiswa = {
  nama: 'Aris Purnama',
  angkatan: {
    nama: 'Neophyte'
  }
};

console.log(mahasiswa.programStudi.nama);
// output: error
// karena programStudi bernilai undefined
// program mencoba untuk mendapatkan properti 'nama' dari undefined

console.log(mahasiswa.programStudi?.nama);
// output: undefined
```

Sumber: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

## Asynchronous

Coming soon...

Sumber: [https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)