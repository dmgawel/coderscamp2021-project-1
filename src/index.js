const routes = {
    '/': Home,
    '/Actors': Actors,
    '/MovieFrames': MovieFrames,
    '/Soundtracks': Soundtracks,
    '/Results': Results
}

const rootDiv = document.getElementById('root');
rootDiv.innerHTML = routes[window.location.pathname];

// method to render content according to pathname

const navigate = (pathname) => {
    window.history.pushState({}, pathname, window.location.origin + pathname);
    rootDiv.innerHTML = routes[pathname];

}

window.onpopstate = () => {
rootDiv.innerHTML = routes[window.location.pathname];
}
