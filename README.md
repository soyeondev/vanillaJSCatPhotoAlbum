## vanillaJSCatPhotoAlbum ๐ฑ
- 2020 Dev-Matching ์น ํ๋ก ํธ์๋ ๊ฐ๋ฐ์ ๊ณผ์  ๋ณต๊ธฐ
- [ ํ๋ก์ ํธ ๋งํฌ](https://soyeondev.github.io/vanillaJSCatPhotoAlbum/)


## โ study 


### Lazy loading
- Intersection Observer๋ฅผ ํ์ฉํ์ฌ lazy loading ๊ตฌํ
[ [javascript] Intersection Observer API](https://soyeondev.tistory.com/309)

### data-*
- html5์์ data-* ์์ฑ์ ํ์ค์ด ์๋ ์์ฑ์ ์ถ๊ฐ์ ๋ณด๋ฅผ ์ ์ฅํ  ์ ์๋๋ก ํ  ์ ์์
- ์ด๋ ์๋ฆฌ๋จผํธ์๋ data-๋ก ์์ํ๋ ์์ฑ์ ๋ฌด์์ด๋  ์ฌ์ฉ๊ฐ๋ฅํ๋ฉฐ ํ๋ฉด์ ์๋ณด์ด๊ฒ ์ถ๊ฐ์ ๋ณด๋ฅผ ๋ด์ ์ ์์
- html ํ๊ทธ์์ ์ฌ์ฉ๋ฐฉ๋ฒ
```
<article
  id="electriccars"
  data-columns="3"
  data-index-number="12314"
  data-parent="cars">
...
</article>
```
- javascript์์ ์ ๊ทผํ๊ธฐ
```
var article = document.getElementById('electriccars');

article.dataset.columns // "3"
article.dataset.indexNumber // "12314"
article.dataset.parent // "cars"
```
- css์์ ์ ๊ทผํ๊ธฐ
```
article::before {
  content: attr(data-parent);
}
```
```
article[data-columns='3'] {
  width: 400px;
}
article[data-columns='4'] {
  width: 600px;
}
```
