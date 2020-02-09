# City-Builder
City builder with pathfinding

Working Demo: <a href="https://joexbayer.github.io/City-Builder/">Click here!</a>

A Javascript based city builder and pathfinding visualizer.

Cities: <br>
Create cities by clicking on the screen, cities within a certain radius will connect 
with a road. Roads are used for Pathfinding and have small "cars" that will drive from city to city.
Cities will be marked with "City X" based on when they where created.

Pathfinding: <br>
When "Find Path" option is activated, the user can click two cities and the shortest path will be found
using the <a href="https://en.wikipedia.org/wiki/A*_search_algorithm">A* algorithm</a>
The algorithm uses the roads to find the shortest path. When activating the "Save Paths" option, you can
click multiple cities to connect them and find the shortest path. Note, you cant unselect a city! To reset paths
either deactivate "Find Paths" or "Save Paths.

Options:
<ul>
  <li>"Find Path"- When activated, lets the user chose two cities and find the shortes path between them.</li>
  <li>"Save Paths - (Only actice when Find Path is active) Lets the user select multiple cities and connects them"</li>
  <li>"Random City - Creates a fully random city, which the user can expand upon. <b>(Can crash, and reload the site!)</b>"</li>
  <li>"Clear Cities - Clears all current cities."</li>
  <li>"Reset - Does a full reset of the website."</li>
  <li>"Current paths" - Shows a list of all cities in a current pathfinding path.</li>
</ul>
