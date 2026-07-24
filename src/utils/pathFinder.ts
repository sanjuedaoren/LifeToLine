import { chainData } from '../data/chainData';
import { PersonNode } from '../types';

export function findPath(startId: string, endId: string): PersonNode[] | null {
  if (!startId || !endId) return null;
  if (startId === endId) {
    const node = chainData.find(n => n.id === startId);
    return node ? [node] : null;
  }

  // Create adjacency map
  const adjacency: Record<string, string[]> = {};
  chainData.forEach(person => {
    if (!adjacency[person.id]) adjacency[person.id] = [];
    if (person.relationships.next) {
      adjacency[person.id].push(person.relationships.next.id);
    }
    if (person.relationships.previous) {
      adjacency[person.id].push(person.relationships.previous.id);
    }
  });

  // Breadth First Search (BFS)
  const queue: string[][] = [[startId]];
  const visited = new Set<string>([startId]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const current = path[path.length - 1];

    if (current === endId) {
      return path.map(id => chainData.find(n => n.id === id)!).filter(Boolean);
    }

    const neighbors = adjacency[current] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
  }

  // Fallback: sequential slice if graph path is directional
  const startIndex = chainData.findIndex(n => n.id === startId);
  const endIndex = chainData.findIndex(n => n.id === endId);

  if (startIndex !== -1 && endIndex !== -1) {
    if (startIndex <= endIndex) {
      return chainData.slice(startIndex, endIndex + 1);
    } else {
      return chainData.slice(endIndex, startIndex + 1).reverse();
    }
  }

  return null;
}
