/**
 * @file example/index
 * @author y
 */
import Graph from '../lib/index';

let g;

function init() {
    if (g) {
        g.dispose();
    }
    g = new Graph(document.querySelector('#root'));
    g.setData({
        nodes: [
            {
                id: '2',
                x: 150,
                y: 200,
                size: 60,
            },
            {
                id: '1',
                x: 150,
                y: 500,
                size: 60,
            },
        ],
        edges: [
            {
                source: '2',
                target: '1',
            },
        ],
    });
    g.render();
}

init();

if ((module as __WebpackModuleApi.Module).hot) {
    (module as __WebpackModuleApi.Module).hot.accept('../lib/index', () => {
        init();
    });
}
