'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
    this.container.textContent = '';
    const ul = createAndAppend('ul', this.container)
    const li = createAndAppend('li', ul);
    const table = createAndAppend('table', li);
    const headersAndKeys = {
        Repository: repo.name,
        Description: repo.description,
        Forks: repo.forks,
        Updated: repo.updated_at
    }

    for (let [key, value] of Object.entries(headersAndKeys)) {
        // console.log(`${key}: ${value}`);
        const tr = createAndAppend('tr', table);
        const th = createAndAppend('th', tr, {
            text: key + ':'
        });
        if (value === repo.name) {
            const td = createAndAppend('td', tr);
            createAndAppend('a', td, {
                href: repo.html_url,
                text: value
            })

        } else if (value === repo.updated_at) {
            createAndAppend('td', tr, {
                text: repo.updated_at
            })
        } else {
            createAndAppend('td', tr, {text: value})
        }
    }
      console.log('RepoView', repo);
    }
  }

  window.RepoView = RepoView;
}
