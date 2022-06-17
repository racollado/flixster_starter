## Week 1 Assignment: Flixster

Submitted by: Rafael Collado

Estimated time spent: 16 hours spent in total

Deployed Application (optional): [Flixster Deployed Site](https://racollado.github.io/flixster_starter/)

### Application Features

#### CORE FEATURES

- [X] User can view a list of current movies from The Movie Database API as a grid view
  - The grid element should have an id of `movies-grid`
  - Each movie wrapper element should have a class of `movie-card`
- [X] For each movie displayed, user can see the following details:
  - Title - the element should have a class of `movie-title`
  - Image - the `img` element should have a class of `movie-poster`
  - Votes - the element should have a class of `movie-votes`
- [X] User can load more current movies by clicking a button at the bottom of the list
  - The button should have an id of `load-more-movies-btn`.
  - When clicked, the page should not refresh.
  - New movies should simply be added to the bottom
- [X] Allow users to search for movies and display them in a grid view
  - There should be a search input element with an id of `search-input`
  - Users should be able to type into the input
  - When a user hits 'Enter', it should send a search request to the movies API
  - The results from the search should be displayed on the page
  - There should be a close icon with an id of `close-search-btn` that exits the search, clears results, and shows the current movies displayed previously
- [X] Website accounts for basic HTML/CSS accessibility features
- [X] Website should be responsive

#### STRETCH FEATURES

- [X] Deploy website using GitHub Pages. (not currently functional?)
- [X] Allow user to view more details about a movie within a popup.
- [X] Improve the user experience through CSS & animation. (Implemented loading animation and background dim animation)
- [X] Allow movie video trailers to be played using [embedded YouTube](https://support.google.com/youtube/answer/171780?hl=en)
- [X] Implement anything else that you can get done to improve the app functionality! 
Extra functionality: Search refreshes automatically (no need to press Enter, though that functionality is implemented.) Escape key closes pop-up. Video dropdown selection. Clicking outside the dimmed content closes pop-up. Clicking Netfilms header refreshes page.

### Walkthrough Video

https://user-images.githubusercontent.com/73001297/174406314-9a022845-ca0f-45c3-bdfd-5f6175169b57.mp4

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

Fetching info through the API was very easy because of Lab 3. I also thought the report card lab was very useful for learning about page interactivity. However, I felt particularly unprepared with using CSS grid and many other CSS properties in general.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
One thing I wanted to implement (but doesn't work on Chrome yet) is grid resizing animations. I would also test the website on mobile. Finally, I wish I could implement an infinite scroll (automatically load more movies when user arrives to the bottom of the page), but it would go against the specs of the project. Otherwise, I was able to implement most of the features I sought to achieve!

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

My project works well! The only bug that occasionally occurs is if a user types a search too quickly, the webpage doesn't clear the previous results and the search results appear incorrectly (search results are appended underneath old movie cards).

### Open-source libraries used

https://developers.themoviedb.org/3
https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css
https://i.pinimg.com/originals/f6/97/4e/f6974e017d3f6196c4cbe284ee3eaf4e.png
https://fonts.googleapis.com
https://youtube.com/embed

### Shout out

Shout outs to Yilika for troubleshooting Codepath with me and Phineas for helping me through the development process.
