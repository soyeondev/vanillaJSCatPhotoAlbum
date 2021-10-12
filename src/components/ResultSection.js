export default class ResultSection{
    constructor($target){
        this.section = document.createElement("section");
        this.section.className = "result-section";
        // this.data = data;
        this.lastIdx = 0;
        $target.appendChild(this.section);
        this.render();
        // this.lazyLoadObserver();
    }

    setState(data){
        this.data = data;
        this.render();
        // this.lazyLoadObserver();
    }

    render() {
        this.section.innerHTML = "";
        // if(this.data === null){
            const initialResult = document.createElement("div");
            initialResult.innerHTML = "<h1>검색어를 입력해주세요!</h1>";
            initialResult.className = "initial-result";
            this.section.appendChild(initialResult);
        // }
    }
}