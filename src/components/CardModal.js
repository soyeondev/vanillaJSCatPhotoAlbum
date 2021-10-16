export default class CardModal {
    constructor(data){
        this.data = data;
        this.modalWrapper = document.createElement("div");
        this.modalWrapper.className = "modal-wrapper";

        document.querySelector(".app").appendChild(this.modalWrapper);

        this.render();
    }

    render(){
        const overlay = document.createElement("div");
        overlay.className = "overlay";

        const modalContents = document.createElement("section");
        modalContents.className = "modal-contents";

        this.modalWrapper.appendChild(overlay);
        this.modalWrapper.appendChild(modalContents);
    }
}