class FriendCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    
        `;
  }
}

customElements.define("friendCard", FriendCard);
