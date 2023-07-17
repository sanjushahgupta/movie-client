import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import { StrictMode } from 'react';
import "./index.scss";

const App = () => {
    return (
        <Container fluid>
            <MainView />
        </Container>
    );
};

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(
    <App />
);
