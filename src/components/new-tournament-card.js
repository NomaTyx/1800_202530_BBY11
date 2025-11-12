class NewTournamentCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <a class="card" style="width: 18rem">
    <div class="card-body">
      <img src="/images/plus.png" alt="add new tourney" class="img-fluid"/>
        <h5 class="card-title text-center">new tourney</h5>
    </div>
    </a>`;
  }
}

customElements.define("new-tournament-card", NewTournamentCard);
