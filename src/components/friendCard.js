class FriendCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="row">   
        <div class="col">
            <img src="/images/chess-placeholder.svg" alt="friend-profile" />
        </div>
        <div class="col">
            <p>friend username</p>
        </div> 
    </div>
        `;
  }
}

customElements.define("friend-card", FriendCard);
