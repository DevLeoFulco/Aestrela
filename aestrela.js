// grafo
const graph = {
    BV: { PI: 2, IM: 5.01 },
    PI: { CA: 1.47 },
    CA: { DE: 2.68 },
    DE: { BE: 1.11, MA: 1.10 },
    MA: { FIC: 3.81 },
    IM: { JS: 5.72 },
    JS: { FIC: 3.79, BON: 1.90 },
    BON: { COR: 1.24 },
    COR: { FIC: 2.34 },
    FIC: {}  // FIC é o destino
};

// Função heurística - distância em linha reta entre os bairros e o destino final
const heuristic = {
    BV: 11.01,  
    PI: 8.34,   
    CA: 6.84,   
    DE: 4.76,   
    BE: 4.65,   
    MA: 3.80,   
    IM: 8.48,   
    JS: 3.40,   
    BON: 2.71,  
    COR: 2.36,  
    FIC: 0,     // O destino para si mesmo tem distância zero
};

function astar(graph, start, goal) {
    const openSet = [{ node: start, cost: heuristic[start] }];
    const cameFrom = {};
    const gScore = {};
    gScore[start] = 0;

    while (openSet.length > 0) {
        openSet.sort((a, b) => gScore[a.node] + a.cost - gScore[b.node] - b.cost);
        const current = openSet.shift().node;

        if (current === goal) {
            return reconstructPath(cameFrom, goal);
        }

        for (const neighbor in graph[current]) {
            const distance = graph[current][neighbor];
            const tentativeGScore = gScore[current] + distance;

            if (!gScore[neighbor] || tentativeGScore < gScore[neighbor]) {
                cameFrom[neighbor] = current;
                gScore[neighbor] = tentativeGScore;
                openSet.push({ node: neighbor, cost: heuristic[neighbor] });
            }
        }
    }

    return null;
}

function reconstructPath(cameFrom, current) {
    const path = [current];
    while (cameFrom[current]) {
        current = cameFrom[current];
        path.push(current);
    }
    return path.reverse();
}

// Exemplo de uso:
const start = 'BV';
const goal = 'FIC';
const path = astar(graph, start, goal);
console.log(path);
