import { setItem } from "../util/localStorage.js";

// 검색 섹션
export default class SearchSection {
    constructor({$target, onSearch, keywords}) {
        this.section = document.createElement("section");
        this.section.className = "search-section";
        this.onSearch = onSearch;
        this.keywords = keywords;
        $target.appendChild(this.section);
        this.render();
    }

    // 키워드 추가
    addKeyword(keyword) {
        if(this.keywords.length >= 5) {
            this.keywords.shift();  // 첫번째 인자를 삭제
        }
        // 검색된 키워드가 없는경우 배열에 추가
        if(this.keywords.indexOf(keyword) == -1){
            this.keywords = this.keywords.concat([keyword]);
            this.render();  // 배열에 변화가 있는 경우에만 render()함수를 호출
        }
    }

    // 키워드 삭제
    removeKeyword(kword) {
        // 선택된 키워드를 제외한 배열을 리턴
        this.keywords = this.keywords.filter((word) => {
            return word != kword;
        });
        setItem("keywords", this.keywords);
        this.render();
    }

    render() {
        this.section.innerHTML = "";
        
        const wrapper = document.createElement("div");
        wrapper.className = "wrapper";

        const randomButton = document.createElement("span");
        randomButton.innerText = "🐱";
        randomButton.className = "random-btn";
        randomButton.addEventListener("click", (e) => {
            this.onSearch(null, false);
        });

        const searchBox = document.createElement("input");
        searchBox.className = "search-box";
        searchBox.autofocus = true;
        searchBox.placeholder = "고양이를 검색하세요";

        const keywords = document.createElement("div");
        keywords.className = "keywords";
        if(this.keywords) {
            this.keywords.map((word) => {
                const kword = document.createElement("div");
                kword.className = "keyword";
                kword.innerText = word;
                // 단어 클릭 시 검색
                kword.addEventListener("click", (e) => {
                    // 키워드 클릭시
                    if(e.target.className == "keyword") {
                        this.onSearch(word, true);
                    // X 클릭시
                    } else if(e.target.className == "delete-keyword"){
                        this.removeKeyword(word);
                    }
                });
                const deleteWord = document.createElement("span");
                deleteWord.innerText = "X";
                deleteWord.className = "delete-keyword";
                keywords.appendChild(kword);
                kword.appendChild(deleteWord);
            });
        }

        // 엔터키 입력시 검색
        searchBox.addEventListener("keypress", (e) => {
            if(e.keyCode == 13){
                const keyword = searchBox.value;
                this.onSearch(keyword, true);
                this.addKeyword(keyword);
            }
        });

        // 검색창 클릭시 초기화
        searchBox.addEventListener("click", () => {
            searchBox.value = "";
        });

        wrapper.appendChild(randomButton);
        wrapper.appendChild(searchBox);
        wrapper.appendChild(keywords);
        
        this.section.appendChild(wrapper);
    }
}