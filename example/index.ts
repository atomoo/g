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
                size: 60
            },
            {
                id: '1',
                x: 300,
                y: 200,
                size: 60
            }
        ],
        edges: [
            {
                source: '2',
                target: '1'
            }
        ]
    });
    console.log(g);
    g.render();
}

init();

if (module.hot) {
    module.hot.accept('../lib/index', function() {
        init();
    });
}


