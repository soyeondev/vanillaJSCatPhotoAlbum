import Card from "./Card.js";

export const findInfoById = (data, id) => {
    return data.find((cat) => cat.id === id);
}

export const getLastIdx = (data, lastIdx, offset) => {
    if(data.length < offset || lastIdx > data.length - offset){
        return data.length;
    } else {
        return lastIdx + offset;
    }
}

export default class ResultSection{
    constructor($target, data){
        this.section = document.createElement("section");
        this.section.className = "result-section";
        this.data = data;
        this.lastIdx = 0;
        $target.appendChild(this.section);
        this.render();
        this.lazyLoadObserver();
    }

    setState(data){
        this.data = data;
        this.render();
        this.lazyLoadObserver();
    }

    lazyLoadObserver() {
        const options = {threshold: 0};
        const callback = (entreis, observer) => {
            entreis.forEach((entry) => {
                if(entry.isIntersecting) {
                    observer.unobserve(entry.target);
                    entry.target.src = entry.target.dataset.src;
                }
            })  
        };
        const io = new IntersectionObserver(callback, options);
        const lazyImages = Array.from(document.getElementsByClassName("lazy"));
        lazyImages.forEach((image) => {
            io.observe(image);
        })
    }

    render() {
        this.section.innerHTML = "";
        if(this.data === null){
            const initialResult = document.createElement("div");
            initialResult.innerHTML = "<h1>검색어를 입력해주세요!</h1>";
            initialResult.className = "initial-result";
            this.section.appendChild(initialResult);
        } else {
            console.log("data: ", this.data);
            if(this.data.length > 0){
                const cardContainer = document.createElement("div");
                cardContainer.className = "card-container";
                const lastIdx = getLastIdx(this.data, 0, 15);
                if(lastIdx != this.data.length) {
                    const fetchData = this.data.slice(0, lastIdx + 1);
                    fetchData.forEach((cat) => new Card(cardContainer, cat));
                } else {
                    this.data.forEach((cat) => {
                        new Card(cardContainer, cat);
                    });
                }
                this.section.appendChild(cardContainer);
            } else {
                const noResult = document.createElement("div");
                noResult.className = "no-result";
                noResult.innerHTML = "<h1>검색어에 해당하는 냥이가 없습니다</h1>";
                this.section.appendChild(noResult);
            }
        }
    }
}