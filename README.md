# Graph-Visualizer
Graph Visualizer with pathfinding.

Working Demo: <a href="https://joexbayer.github.io/City-Builder/">Click here!</a>

A Javascript based graph visualizer and pathfinding.

 ![alt text](https://github.com/joexbayer/Graph-Visualizer/blob/master/src/Menu.png?raw=true)

Nodes: <br>
Create nodes by clicking on the screen, connect the nodes by clicking on a existing node and 
then the next. Both directed and undircted edges can be created.
If you enable autoconnect nodes within a certain radius will created edges.
Edges are used for Pathfinding and have small "bots" that will go from node to node.
They can be turned off.
Nodes will be marked with "Node X" based on when they where created.

 ![alt text](https://github.com/joexbayer/Graph-Visualizer/blob/master/src/Graph.png?raw=true)
 
Pathfinding: <br>
When "Find Path" option is activated, the user can click two nodes and the shortest path will be found
using the <a href="https://en.wikipedia.org/wiki/A*_search_algorithm">A* algorithm</a>
The algorithm uses the edges to find the shortest path. When activating the "Save Paths" option, you can
click multiple nodes to connect them and find the shortest path. Note, you cant unselect a node! To reset paths
either deactivate "Find Paths" or "Save Paths.

Options:
<ul>
  <li>Press <b style="color:blue">R</b> to undo last node or edge created.</li>
  <li>Options that are <b style="color:red">RED</b> are turned off.</li>
  <li>To connect nodes simply click on a node then the next.</li>
  <li>The base case will be a undirected edge, to create a directed edge click the option in the menu.</li>
  <li>"Autoconnect" will connect nodes that are close to each other.</li>
  <li>Bots will move with the edges, click "Hide Bots" to hide them.</li>
  <li>"Random Graph" will create a random graph based on input at the bottom.</li>
  <li>To find the shortest path between to nodes press the <b style="color:darkgreen">"Find Path"</b> button.</li>
  <li>If you want to connect multiple nodes click the <b style="color:darkgreen">"Save Paths"</b> button.</li>
</ul>
