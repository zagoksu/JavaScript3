'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    
    Object.entries(options).forEach(([key, value]) => {
      
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

 function renderRepoDetails(repo, ul) {

    const li = createAndAppend('li', ul);
    const table = createAndAppend('table', li);
    const headersAndKeys = {
        Repository: repo.name,
        Description: repo.description,
        Forks: repo.forks,
        Updated: repo.updated_at
    }

    for (let [key, value] of Object.entries(headersAndKeys)) {
        console.log(`${key}: ${value}`);

        const tr = createAndAppend('tr', table);
        const th = createAndAppend('th', tr, {
            text: key + ':'
        });

        if (value === repo.name) {
            createAndAppend('a', tr, {
                href: repo.html_url,
                text: value
            })
        } else if (value === repo.updated_at) {
            createAndAppend('td', tr, {
                text: adjustTime(repo.updated_at)
                // value.slice(0, 10).replace(/-/g,"/") + ",  " + value.slice(11, 19)
            })
        } else {
            createAndAppend('td', tr, {text: value})
        }
    }
}

function adjustTime(time) {
    const date = new Date(time);
    return date.toLocaleString('en-US', {hour12: true});
}

  function main(url) {
    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      const heading = createAndAppend('h2', root);
      heading.innerHTML = 'HYF Repositories';
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }

      const ul = createAndAppend('ul', root);
      repos.sort((current, next) => 
      current.name.localeCompare(next.name))
          
      for (let i = 0; i < 10; i++) {
        renderRepoDetails(repos[i], ul);
      }
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}

