class TournamentCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <a class="card" style="width: 18rem">
        <h5 class="card-title">tournament name will probably be long</h5>
        <div>
          <span>Rounds: x</span>
          <span>Score: y/x</span>
          <span>m/d/y - m/d/y</span>
        </div>
    </a>`;
  }
}

customElements.define("tournament-card", TournamentCard);
