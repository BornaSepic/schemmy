import ReactGA from 'react-ga';

export const initGA = () => {
    ReactGA.initialize('UA-131738935-2');
};

export const logPageView = (path) => {
    ReactGA.pageview(path);
};