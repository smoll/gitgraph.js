/***********************
 *  CUSTOM TEMPLATES   *
 ***********************/

var myTemplateConfig = {
branch: {
  color: "#000000",
  lineWidth: 4,
  spacingX: 50,
  mergeStyle: "straight"
},
commit: {
  spacingY: -60,
  dot: {
    size: 12,
    strokeColor: "#000000",
    strokeWidth: 7
  },
  message: {
    color: "black"
  }
},
arrow: {
  size: 16,
  offset: 2.5
}
};
var myTemplate = new GitGraph.Template( myTemplateConfig );

/***********************
 *    INITIALIZATION   *
 ***********************/

var config = {
  template: myTemplate       // could be: "blackarrow" or "metro" or myTemplate (custom Template object)
  , orientation: "horizontal"
  //, mode: "compact"     // special compact mode : hide messages & compact graph
};
var gitGraph = new GitGraph( config );

/***********************
 * BRANCHS AND COMMITS *
 ***********************/

// Create branch named "master"
var master = gitGraph.branch( "master" );

// Commit on HEAD Branch which is "master"
gitGraph.commit( "Initial commit" );

// Add few commits on master.
gitGraph.commit( "My second commit" ).commit( "Add awesome feature" );

// Create a new "dev" branch from "master"
var dev = gitGraph.branch( "dev" );
dev.commit( "Youhou \\o/" );

// Commit again on "master"
master.commit( "I'm the master !" );

// Advanced commit method with style and specific author (HEAD)
var commitConfig = {
  dotColor: "white",
  dotSize: 10,
  dotStrokeWidth: 10,
  messageHashDisplay: false,
  messageAuthorDisplay: true,
  message: "Alors c'est qui le papa ?",
  author: "Me <me@planee.fr>"
};
gitGraph.commit( commitConfig );

/***********************
 *      CHECKOUT       *
 ***********************/

// Checkout on master branch for create "test" since master
//master.checkout();

/***********************
 *       DETAILS       *
 ***********************/

var commitWithDetailsConfig = {
  message: "test",
  detail: "detail" // Id of detail div (available in normal vertical mode only)
};
gitGraph.commit( commitWithDetailsConfig ).commit();
dev.commit().commit(); // 2 default Commit on "dev"

/***********************
 *    CUSTOMIZATION    *
 ***********************/

gitGraph.author = "Fabien0102 <fabien0102@planee.fr>";
master.commit();

/***********************
 *       MERGES        *
 ***********************/

master.checkout();

// Merge "dev" branch into HEAD (which is "master"), with a default message
dev.merge();

// Create a "test" branch and merge in into "master" with a custom message.
var test = gitGraph.branch( "test" );
test.commit( "Final commit" );
test.merge( master, "My special merge commit message" );

// Then, continue committing on the "test" branch
test.commit( "It's works !" );

/***********************
 *       EVENTS        *
 ***********************/

gitGraph.canvas.addEventListener( "commit:mouseover", function ( event ) {
  console.log( "You're over a commit.", "Here is a bunch of data ->", event.data );
} );
