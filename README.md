## vanillaJSCatPhotoAlbum 🐱
- 2020 Dev-Matching 웹 프론트엔드 개발자 과제 복기
- [ 프로젝트 링크](https://soyeondev.github.io/vanillaJSCatPhotoAlbum/)


## ✏ study 


### Lazy loading
- Intersection Observer를 활용하여 lazy loading 구현
[ [javascript] Intersection Observer API](https://soyeondev.tistory.com/309)

### data-*
- html5에서 data-* 속성은 표준이 아닌 속성에 추가정보를 저장할 수 있도록 할 수 있음
- 어느 엘리먼트에나 data-로 시작하는 속성은 무엇이든 사용가능하며 화면에 안보이게 추가정보를 담을 수 있음
- html 태그에서 사용방법
```
<article
  id="electriccars"
  data-columns="3"
  data-index-number="12314"
  data-parent="cars">
...
</article>
```
- javascript에서 접근하기
```
var article = document.getElementById('electriccars');

article.dataset.columns // "3"
article.dataset.indexNumber // "12314"
article.dataset.parent // "cars"
```
- css에서 접근하기
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
