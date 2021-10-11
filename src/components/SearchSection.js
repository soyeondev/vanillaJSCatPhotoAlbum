export default class SearchSection {
    constructor({$target}) {
        this.section = document.createElement("section");

        this.section.className = "search-section";
        $target.appendChild(this.section);
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

        wrapper.appendChild(randomButton);
        wrapper.appendChild(searchBox);
        
        this.section.appendChild(wrapper);
    }
}