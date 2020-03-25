'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      // TODO: replace this comment and the console.log with your own code
      this.container.innerHTML = '';
      contributors.forEach((data) => {
        const ul = createAndAppend('ul', this.container)
        const li = createAndAppend('li', ul);
        const img = createAndAppend('img', li, {src: data.avatar_url});
        const link = createAndAppend('a', li, {
            text: data.login,
            href: data.html_url
        });
        const span = createAndAppend('span', li, {text: data.contributions});
    });
      console.log('ContributorsView', contributors);
    }
  }

  window.ContributorsView = ContributorsView;
}
