// grafo
const graph = {
    BV: { PI: { cost: 4.1, busStops: 11 }, IM: { cost: 5.01, busStops: 3 } },
    PI: { CA: { cost: 1.47, busStops: 4 } },
    CA: { DE: { cost: 2.68, busStops: 5 } },
    DE: { BE: { cost: 1.11, busStops: 3 }, MA: { cost: 1.1, busStops: 3 } },
    MA: { FIC: { cost: 3.81, busStops: 11 } },
    IM: { JS: { cost: 1, busStops: 8 } }, // Ajustado o custo de 5.72 para 1 para verificar os dados iguais
    JS: { FIC: { cost: 1, busStops: 9 } }, // Ajustado o custo de 3.79 para 1 para verificar os dados iguais
    BON: { COR: { cost: 1.24, busStops: 5 } },
    COR: { FIC: { cost: 2.34, busStops: 7 } },
    FIC: { busStops: 0 }, // FIC é o destino
  };
  
  // Função heurística 
  const heuristic = {
    BV: 11.01,
    PI: 8.34,
    CA: 6.84,
    DE: 4.76,
    BE: 4.65,
    MA: 3.8,
    IM: 8.48,
    JS: 3.4,
    BON: 2.71,
    COR: 2.36,
    FIC: 0, // O destino para si mesmo tem distância zero
  };
  
  function astar(graph, start, goal) {
    const openSet = [{ node: start, cost: heuristic[start] }];
    const cameFrom = {};
    const gScore = {};
    gScore[start] = 0;
  
    while (openSet.length > 0) {
      openSet.sort((a, b) => {
        const aScore = gScore[a.node] + a.cost;
        const bScore = gScore[b.node] + b.cost;
        if (aScore === bScore) {
          // Se os custos totais são iguais, o número de pontos de ônibus será o critério de desempate
          return graph[a.node].busStops - graph[b.node].busStops;
        }
        return aScore - bScore;
      });
  
      const current = openSet.shift().node;
  
      if (current === goal) {
        return reconstructPath(cameFrom, goal);
      }
  
      for (const neighbor in graph[current]) {
        const { cost, busStops } = graph[current][neighbor];
        const tentativeGScore = gScore[current] + cost;
  
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
  const start = "BV";
  const goal = "FIC";
  const path = astar(graph, start, goal);
  console.log(path);
  