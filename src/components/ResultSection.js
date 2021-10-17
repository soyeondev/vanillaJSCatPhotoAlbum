import Card from "./Card.js";
import CardModal from "./CardModal.js";

export const findInfoById = (data, id) => {
    return data.find((cat) => cat.id === id);
}

// 로드된 카드들의 마지막 인덱스를 구함
export const getLastIdx = (data, lastIdx, offset) => {
    console.log("getLastIdx data: ", data);
    console.log("getLastIdx lastIdx: ", lastIdx);
    console.log("getLastIdx offset: ", offset);
    // 데이터의 
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

    closeModal(){
        const modal = document.querySelector(".modal-wrapper");
        modal.remove();
    }

    lazyLoadObserver() {
        const options = {threshold: 0};
        // 관찰 대상이 등록되거나 가시성에 변화가 생길 경우 callback을 실행
        const callback = (entreis, observer) => {
            entreis.forEach((entry) => {
                if(entry.isIntersecting) {  // 관찰 대상이 보일 경우
                    observer.unobserve(entry.target);   // 관찰 대상을 관찰 중지함
                    entry.target.src = entry.target.dataset.src;    // entry의 data-src를 img 태그 src에 저장                     
                }
            })
        };
        const io = new IntersectionObserver(callback, options);
        // lazy 클래스를 가지고 있는 element를 모두 가져옴
        const lazyImages = Array.from(document.getElementsByClassName("lazy"));
        console.log("lazyImages: ", lazyImages);        
        lazyImages.forEach((image) => {
            io.observe(image); // 각각의 element를 관찰
        })
    }

    // 무한스크롤 
    setScrollPagingObserver(data, lastIdx){
        console.log("lastidx: ", lastIdx);
        // threshold: 0 
        const options = {threshold: 0, rootMargin: "10px 0px"};
        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                // intersectionRect: 관찰 대상(entry)이 루트요소와 교차 상대로 들어가는 경우 true를 반환
                if(entry.isIntersecting) {
                    // entry가 루트요소 안에 있는 경우
                    const newLastIdx = getLastIdx(this.data, lastIdx, 15);
                    if(newLastIdx == lastIdx) { // newLastIdx가 lastIdx와 같을 경우 -> 마지막 오프셋 데이터인 경우
                        observer.unobserve(entry.target); // 대상 요소의 관찰을 중지
                    } else {
                        observer.unobserve(entry.target); // 대상 요소의 관찰을 중지
                        const fetchData = this.data.slice(  // 전체 데이터중 lastIdx에서 newLastIdx까지의 데이터를 fetchData에 할당 
                            lastIdx + 1,
                            newLastIdx + 1
                        );
                        lastIdx = newLastIdx;   // lastIdx를 갱신
                        fetchData.forEach((cat) => {  // 갱신된 데이터를 하나씩 가져와서 각각 Card를 생성
                            new Card(
                                document.querySelector(".card-container"),
                                cat
                            )
                        });
                        observer.observe(   // 갱신된 데이터로 관찰 시작
                            document.querySelector(".card-container").lastChild
                        )
                        this.lazyLoadObserver();
                    }
                    entry.target.src = entry.target.dataset.src;
                }
            });
        }
        const io = new IntersectionObserver(callback, options);
        const lastData = document.querySelector(".card-container").lastChild;
        io.observe(lastData);
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

                // click event 
                cardContainer.addEventListener("click", (e) => {
                    console.log(e);
                    const clickedCard = e.path.find(
                        (p) => p.className == "card"
                    );
                    console.log("clickedCard :", clickedCard);
                    if(clickedCard) {
                        const id = clickedCard.dataset.id;
                        const info = findInfoById(this.data, id);
                        const cardModal = new CardModal(info);
                    }
                });

                // esc 키를 누를 경우 modal창 닫음
                document.addEventListener("keydown", (e) => {
                    console.log(e);
                    if(e.key === "Escape" && document.querySelector(".modal-wrapper")){
                        this.closeModal();
                    }
                });

                this.section.appendChild(cardContainer);
                if(lastIdx != this.data.length){
                    this.setScrollPagingObserver(this.data, lastIdx);
                }
            } else {
                const noResult = document.createElement("div");
                noResult.className = "no-result";
                noResult.innerHTML = "<h1>검색어에 해당하는 냥이가 없습니다</h1>";
                this.section.appendChild(noResult);
            }
        }
    }
}