J World Music
=============
[About](#About)  
[Technologies](#Technologies)  
[Usage](#Usage)  
[Build](#Build)  
[Contact](#Contact)

## About
> This project was built to meet the client's request for a website to display some of his musical work. The idea was to create a player to listen to some of his songs, have a link to play his video, as well as find some info about him and contact form him that linke to his email.
The website is hosted on [Netlify](https://www.netlify.com/).
 
## Technologies
This project was built using the following technologies:
- HTML5
- SASS compiled with GULP-SASS
- JQuery
- JavaScript
- Mustache
- Gulp

## Usage
After cloning the project's folder, the following command must be ran in the terminal to download the dependencies:
~~~
npm i --save-dev gulp-browserify gulp-concat gulp-compass gulp-cssnano gulp-imagemin gulp-minify-html gulp-uglify-es
~~~

Following the installation, the we can run the command bellow to watch changes in *./components/* to automatically compile all ***.scss*** into **.css** and concatenate all ***.js** files into one script file:

~~~
gulp watch
~~~

and the defaul gulp command,

~~~~
gulp
~~~~

will run the following dependencies 
- gulp-minify-html
- gulp-cssnano
- gulp-uglify-es
- imagemin

to minify all files and pipe them to **./builds/dist**.

## Build

>The root of the project's folder consist in two main folders: **components** and **builds**.
The **components** folder contains two files:
>
>- scripts
>- sass
>
>Inside **sass** are located all sass partials, organized by components. All of them are exported to a main **style.scss**, which imports all partials and is then compile to *CSS* and piped to *./builds/development/css*.
In **scripts** can be found all **\*.js** files which are concatenated using *gulp-concat* into a single **script.js** and piped to *~/builds/development/js*.

**MarkUp**

Almost all html is contained in **index.html** and separeted in the following sections:

```html
<!-- Home section -->
    ...
<!-- MEET section -->
    ...
<!-- SONGS section -->
    ...
<!-- VIDEO section -->
    ...
<!-- CONTACT section -->
    ...
    <!-- FORM section -->
        ...
```
The markup for the song player is build dinamically using this **Mustache** template:

```html
 <script type="text/template" id="template">
    {{#songs}}
    <li>
    <img data-src={{dataSource}} src={{src}} alt={{alt}}>
    <div>{{songTitle}}</div>
    <!-- <span>paused</span> -->
    <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
    </div>
    </li>
    {{/songs}}

</script>
```

which is rendered using a *JavaScript* object and *JQuery* located in *./builds/development/js* folder. It contains the relevant data for every song in the player. 

```javascript
let data = {
        "songs":[
            {
                "songTitle":"Get Out",
                "dataSource":"songs/getOut.mp3",
                "src":"images/play.svg",
                "alt":"play button"
            }
        ]
};

let content = $('#template').html();

    let result = Mustache.render(content, data);

    $('#template-container').html(result);
```

*JQuery* finds the *script* tag in **index.html**, uses the *data* object to render the markup and then target a container, *#template-container* element with the resulting code.

**Scripts**

All the scripts are located in *./components/scripts*. They are separed in the following modules to make the code more maintainable and easy to understand:

- jquery-3.4.2.min.js
- mustache.js
- observer.js
- player.js 
- script.js
- template-script.js

In **script.js** is found the logics  responsible for general features on the page, not related to any specif section. 
The libraries used in the project are also kept in script files, **jquery.js** and **mustache.js**, in the same folder.

The file **observer.js** contains the Intersection Observer responsible for triggering the animation on the *Meet* section by adding/removing a class.

In **player.js** are contained all the logics for the player. It was built using vanilla *JavaScript*.

Last, the file **template-script.js**  is responsible for building the player's markup with *Mustache*.

**Styles**

All the styles were written with *SASS* and are found in *./components/sass*. They are all organized in partials to target different sections of the website, making it easier to maintain.
The file **styles.scss** imports all partials and is compiled into *CSS* using *Compass*.

**Dist**

In *./builds/dist* are found all the files minified and ready to be deployed to the web.

**Future**

The client gave me full liberty regarding the design and functionality of the page, so small updates and changes are done often to improve the design.

## Contact

[Email](mailto:rafaelbogfreitas@gmail.com)

[Linkedin](https://github.com/rafaelbogfreitas)

Project built by [Rafael Freitas](https://www.rafaelfreitas.co.uk) | 2019