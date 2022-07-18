# **Materi 3: React, JSX, component, dan property**

# Daftar isi

- [**Materi 3: React, JSX, component, dan property**](#materi-3-react-jsx-component-dan-property)
- [Daftar isi](#daftar-isi)
- [React](#react)
  - [Dari JavaScript ke React](#dari-javascript-ke-react)
    - [Membuat UI (user interface)](#membuat-ui-user-interface)
    - [Apa itu DOM?](#apa-itu-dom)
  - [Instalasi](#instalasi)
    - [Instalasi dengan CDN](#instalasi-dengan-cdn)
    - [Instalasi dengan Node.js](#instalasi-dengan-nodejs)
  - [Hello world!](#hello-world)
- [Pengenalan JSX](#pengenalan-jsx)
  - [Menyematkan statement (pernyataan) di JSX](#menyematkan-statement-pernyataan-di-jsx)
  - [JSX juga statement](#jsx-juga-statement)
  - [Menentukan atribut dengan JSX](#menentukan-atribut-dengan-jsx)
  - [Menentukan child dengan JSX](#menentukan-child-dengan-jsx)
- [Rendering element](#rendering-element)
  - [Merender element ke dalam DOM](#merender-element-ke-dalam-dom)
  - [Memperbarui element yang dirender](#memperbarui-element-yang-dirender)
  - [React hanya memperbarui apa yang perlu diperbarui](#react-hanya-memperbarui-apa-yang-perlu-diperbarui)
- [Component dan property](#component-dan-property)
  - [Class component dan function component](#class-component-dan-function-component)
  - [Merender component](#merender-component)
  - [Menyusun component](#menyusun-component)
  - [Props bersifat read-only (hanya dapat dibaca)](#props-bersifat-read-only-hanya-dapat-dibaca)

# React

React adalah library JavaScript untuk membangun UI (user interface).

> **Tips**
> 
> Setiap kali kalian bingung dengan sesuatu yang berkenaan dengan JavaScript, kalian dapat memeriksa situs web [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript) dan [javascript.info](https://javascript.info/).

## Dari JavaScript ke React

### Membuat UI (user interface)

Untuk memahami cara kerja React, pertama-tama kita perlu pemahaman dasar tentang bagaimana browser menafsirkan kode kita untuk membuat user interface (UI) interaktif.

Saat pengguna mengunjungi halaman web, server mengembalikan file HTML ke browser yang mungkin terlihat seperti ini:

![](img/20220626164914.png)

Browser kemudian membaca HTML dan membuat Document Object Model (DOM).

### Apa itu DOM?

DOM adalah representasi objek dari elemen HTML. Ini bertindak sebagai jembatan antara kode kita dan UI, dan memiliki struktur seperti pohon dengan hubungan parent dan child.

![](img/20220626165045.png)

Kita dapat menggunakan metode DOM dan bahasa pemrograman, seperti JavaScript, untuk mendengarkan peristiwa pengguna dan memanipulasi DOM dengan memilih, menambahkan, memperbarui, dan menghapus elemen tertentu di UI. Manipulasi DOM memungkinkan kita untuk tidak hanya menargetkan elemen tertentu, tetapi juga mengubah gaya dan kontennya.

## Instalasi

Ada 3 library yang perlu diinstal, yaitu React, React DOM, dan Babel.

React DOM digunakan untuk memanipulasi DOM. DOM adalah isi dari dokumen HTML.

Babel digunakan untuk mengompilasi JSX menjadi JavaScript biasa.

### Instalasi dengan CDN

CDN biasa digunakan untuk mengirimkan file stylesheet (CSS) dan JavaScript dari suatu library seperti Bootstrap, jQuery, dll.

Untuk menggunakan React, tambahkan script berikut ke dalam HTML:

```html
<script
    crossorigin
    src="https://unpkg.com/react/umd/react.production.min.js"
></script>
<script
    crossorigin
    src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"
></script>
<script type="text/babel">
// tulis kode JSX di sini
</script>
```

> **Peringatan**
> 
> React dengan CDN hanya untuk latihan, tidak cocok untuk penggunaan produksi

### Instalasi dengan Node.js

Untuk memulai project React dengan Node.js sebenarnya banyak yang harus diinstal dan dikonfigurasi. Untungnya ada sebuah perintah yang akan menyelesaikan semua itu.

```shell
> npx create-react-app nama-aplikasi
```

Perintah di atas akan menginstal semua library dan menyelesaikan semua konfigurasi yang diperlukan agar project siap dikembangkan.

## Hello world!

Contoh penggunaan React sederhana:

```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<h1>Hello world!</h1>);
```

Ini menampilkan judul yang bertuliskan "Hello world!" di halaman.

# Pengenalan JSX

Perhatikan deklarasi variabel berikut.

```jsx
const element = <h1>Hello universe!</h1>;
```

Sintaks tag di atas bukan string atau HTML, melainkan JSX.

JSX merupakan perluasan sintaks untuk JavaScript. Kita perlu menggunakannya dengan React untuk membangun tampilan UI. JSX mungkin mengingatkan kita tentang bahasa template, seperti Blade (di Laravel), Blazor (di ASP.NET), Thymeleaf (di Spring), dll., tetapi yang ini menggunakan JavaScript.

## Menyematkan statement (pernyataan) di JSX

Pada contoh berikut, kita mendeklarasikan variabel bernama `name` dan kemudian menggunakannya di dalam JSX dengan membungkusnya dalam kurung kurawal:

```jsx
const name = 'Indah Mentari';
const element = <h1>Hello {name}!</h1>;
```

Kita dapat menempatkan statement JavaScript apapun (yang valid) di dalam kurung kurawal di JSX. Misalnya, `2 + 2`, `user.firstName`, atau `formatName(user)`.

Pada contoh berikut, kita menyematkan hasil pemanggilan function JavaScript, yaitu `formatName(user)`, ke dalam element `<h1>`.

```jsx
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Indah',
  lastName: 'Mentari'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
```

Kita membagi JSX menjadi beberapa baris agar mudah dibaca. JSX yang lebih dari 1 baris disarankan untuk membungkusnya dalam tanda kurung untuk menghindari masalah titik koma.

## JSX juga statement

JSX juga merupakan statement. Ini berarti kita dapat menggunakannya di dalam decision dan loop, memasukkannya ke variabel, menerimanya sebagai argument, dan mengembalikannya dari function:

```jsx
function getGreeting(user) {
  if (user) {
    // jika user berisi
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  // jika user kosong
  return <h1>Hello, Stranger.</h1>;
}
```

## Menentukan atribut dengan JSX

Kita dapat menggunakan tanda kutip untuk menentukan literal string sebagai atribut:

```jsx
const link = <a href="https://www.pubpasim.org">Buka website PUB</a>;
```

Kita juga dapat menggunakan kurung kurawal untuk menyematkan statement JavaScript dalam sebuah atribut:

```jsx
const image = <img src={user.avatarUrl}></img>;
```

Jangan beri tanda kutip di sekitar kurung kurawal saat menyematkan statement JavaScript dalam sebuah atribut. Gunakan tanda kutip (untuk nilai string) atau kurung kurawal (untuk statement), tetapi tidak keduanya (dalam atribut yang sama).

> **Peringatan**
> 
> Karena JSX lebih dekat dengan JavaScript daripada HTML, penamaan property menggunakan konvensi `camelCase`, bukan nama atribut HTML.
> 
> Misalnya, `class` menjadi `className` di JSX, dan `tabindex` menjadi `tabIndex`.

## Menentukan child dengan JSX

Jika element tidak memiliki child, kita perlu menutupnya dengan `/>` (seperti XML):

```jsx
const element = <img src={user.avatarUrl} />;
```

Jika element memiliki child, maka penulisannya seperti HTML biasa:

```jsx
const element = (
  <div>
    <h1>Halo!</h1>
    <h2>Selamat datang di PUB Portal!</h2>
  </div>
);
```

# Rendering element

## Merender element ke dalam DOM

Misalnya ada sebuah `<div>` di file HTML kita:

```html
<div id="root"></div>
```

`<div>` itu disebut "element DOM root" karena semua yang ada di dalamnya akan dikelola oleh React DOM.

Aplikasi yang dibuat dengan React biasanya hanya memiliki satu element DOM root. Tapi sebenarnya kita bisa menggunakan element DOM root sebanyak yang kita inginkan.

Untuk merender element React, pertama-tama panggil `ReactDOM.createRoot()` dan jadikan element DOM root sebagai argumentnya, lalu panggil `root.render()` dan jadikan element React sebagai argumentnya:

```jsx
const root = ReactDOM.createRoot(
  document.getElementById('root')
);

const element = <h1>Hello world!</h1>;

root.render(element);
```

Itu akan menampilkan "Hello world!" di halaman.

## Memperbarui element yang dirender

Element React tidak dapat diubah. Setelah kita membuat element, kita tidak dapat mengubah child atau atributnya.

Salah satu cara untuk memperbarui UI adalah dengan membuat element baru kemudian memanggil `root.render()` dengan argument berupa element baru tersebut.

Perhatikan contoh jam berikut:

```jsx
const root = ReactDOM.createRoot(
  document.getElementById('root')
);

function tambahDetik() {
  const element = (
    <div>
      <h1>Halo!</h1>
      <h2>Sekarang pukul {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);
}

setInterval(tambahDetik, 1000);
```

Kode di atas memanggil `root.render()` setiap detik dari callback `setInterval()`.

> **Catatan**
> 
> Dalam praktiknya, sebagian besar aplikasi React hanya memanggil `root.render()` sekali saja. Pada materi berikutnya kita akan mempelajari penggunaan `useState()`.

## React hanya memperbarui apa yang perlu diperbarui

React DOM membandingkan element dan child-child-nya dengan yang sebelumnya, dan hanya menerapkan pembaruan DOM yang diperlukan untuk membawa DOM ke keadaan yang diinginkan.

Dari contoh sebelumnya, meskipun kita membuat element yang berisi keseluruhan struktur UI pada setiap detik, hanya teks yang isinya telah diubah yang akan diperbarui oleh React DOM.

# Component dan property

Component memungkinkan kita membagi UI menjadi bagian-bagian independen yang dapat digunakan kembali, dan memikirkan setiap bagian secara terpisah.

Konsep component seperti function JavaScript. Component menerima argument (disebut "props") dan mengembalikan element React yang akan muncul di layar.

## Class component dan function component

Cara paling sederhana untuk mendefinisikan component adalah dengan menulis function JavaScript:

```jsx
function Welcome(props) {
  return <h1>Halo {props.name}!</h1>;
}
```

Function di atas adalah component React yang valid karena menerima argument objek "props" (yang berarti properties) tunggal dengan data dan mengembalikan element React. Component itu disebut "function component" karena secara harfiah merupakan function JavaScript.

Kita juga dapat menggunakan class untuk mendefinisikan component:

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Halo {this.props.name}!</h1>;
  }
}
```

## Merender component

Sebelumnya, element React yang kita buat hanya mewakili tag DOM:

```jsx
const element = <div />;
```

Namun, element juga dapat mewakili component yang telah kita buat:

```jsx
const element = <Welcome name="Muzayyin" />;
```

Ketika terdapat element yang mewakili component, atribut JSX dan child-child-nya diteruskan ke component ini melalui argumen sebagai objek tunggal. Objek ini disebut "props".

Misalnya, kode berikut merender "Halo Muzayyin!" di halaman:

```jsx
function Welcome(props) {
  return <h1>Halo {props.name}!</h1>;
}
```

```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <Welcome name="Muzayyin" />;
root.render(element);
```

> **Catatan**
> 
> Selalu awali nama component dengan huruf kapital.

## Menyusun component

Kita dapat menggunakan component di dalam component. Di aplikasi React, tombol, form, dialog, layar, semua itu biasanya dibuat sebagai component.

Misalnya, kita dapat membuat component `App` yang merender `Welcome` berkali-kali:

```jsx
function Welcome(props) {
  return <h1>Halo {props.name}!</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Muzayyin" />
      <Welcome name="Anti" />
      <Welcome name="Yusfa" />
    </div>
  );
}
```

Biasanya, aplikasi React yang baru memiliki satu component `App`.

## Props bersifat read-only (hanya dapat dibaca)

Component tidak dapat memodifikasi propertinya sendiri.

Perhatikan function `sum()` berikut:

```jsx
function sum(a, b) {
  return a + b;
}
```

Function di atas disebut "murni" karena tidak mengubah inputnya, dan selalu mengembalikan hasil yang sama untuk input yang sama.

Sebaliknya, function berikut tidak murni karena mengubah inputnya sendiri:

```jsx
function withdraw(account, amount) {
  account.total -= amount;
}
```

React memang cukup fleksibel, tapi memiliki satu aturan ketat:

Semua component React harus bertindak seperti function murni terhadap props-nya.

Lalu bagaimana cara membuat UI yang bersifat dinamis dan berubah seiring waktu? Di materi berikutnya, kita akan belajar konsep baru, `useState()`. State memungkinkan component React untuk mengubah outputnya dari waktu ke waktu sebagai respons terhadap tindakan pengguna, respons jaringan, dan lainnya, tanpa melanggar aturan ini.