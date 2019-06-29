//** Selecting elements in an html
    
d3.select("ul"); // This will select the first "ul" item in the html
    // you can chain things to get more specific
d3.select("ul").select("li"); // This will select the li item within the ul div
    // it is possible to navigate up in D3 by selecting the parent
d3.select("ul").(      );  // I forgot the code for this, but you can go up, and then go back down
    // To select all the items you use selectAll
d3.selectALL("ul");
    // when you want to select and id, you put a pound sign in front of it
d3.select(#myid)
    // when you want to select a class, you put a . infront of the class
d3.select(.align=center)  // I can't remember if this is actually a class
    // You can assign a variable to the selection to modify it later in your code
var clip = d3.selectALL(ul);
clip.data().style("height", function(d){return d;});  // then use selection.  to call it later.
    // you can merge two selections (clip) & (clop) using the merge function
clip.enter().append("div").merge(clop);
    // remember that as you chain things, the next element only affects what was next in the chain.  for instance, 
clip.enter().append("div").text(function(d){return d;}); // the text will only show up in the elements that were appended.  Anything before append was not included.
    // merging



//** Binding Data with append and enter and showing the data
    // Use .data to bind the data.  If nothing is in the parenthesis, it will just display as undefined (nothing is binded yet, but it is prepared to be)
d3.selectALL("li").data();
    // To bind actual data  (the data will only appear in the console until your use .text() to show it)
var numbers = [1, 2, 3, 4];
d3.selectALL("li").data(numbers);  //Because there are only 3 li in the html, only the first 3 numbers will be added

var numbers = [11,21];
d3.selectALL("li").data(numbers); // Because this was run after the previous statement, the results will be 11 , 21, 3.   Notice that the 3 is still there.  It not erased when you add new data


//** To view the data.  you must use .text()  
// the data function contains variable d -- for actual data  and i for index
// Think of it like adding a data tag to the html.  it would look something like this
 //    <li  data = 11  class="original">Hello World</li>
 //  The data goes into the tag and you're manipulating that tag.  When you use .text(), you're moving the data from the tag to the place where Hello World is
var numbers = [11,21, 33];
d3.selectALL("li").data(numbers)
    .text(function(d){ return d;});
    // Using this format allows you to modify how the data appears, instead of modifying the actual data.
    // for instance, you can show only 2 decimal places but keep 5 decimal places stored. Or change the units from meters to cm
d3.selectALL("li")
    .data(numbers)
    .text(function(d){
        return d * 100;
    })


//**  Appends vs Enter and adding data
var numbers = [1, 2, 3]
d3.selectALL("li").data(numbers)
    .append("li")                    // append will just add new lis every time it's run.
    .text(function(d){ return d;});
    // If you run the above code twice,  you will end up with 6 lis (assuming you started out with 3 lis in the html). And everytime you run this code, it will add an additional 3 lis

var numbers = [14, 15, 16, 17, 18]
d3.selectALL("li").data(numbers)
    .enter()                        // enter will go through the list and only add the data to the empty elements, and append will only add what is needed
    .append("li")                    
    .text(function(d){ return d;});
    // If you run this code after adding the 1, 2, 3.  Your output will be 1, 2, 3, 17, 18.  The data is only added to the empty slots, and the append will only add what is necessary.

//** Updating, adding and merging data 
// remember that as you chain things, the next element only affects what was next in the chain.  for instance, 
d3.selectALL("li").data(numbers).enter().append("div").text(function(d){return d;}); // the text will only show up in the elements that were appended.  Anything before append was not included. See previous example
    //BUT if you use
d3.selectALL("li").data(numbers).text(function(d){return d;}); // all of the items will be updated, because it hasn't been further filtered before reaching the .text statement
// use merge to update all elements after you've added on to them.
// Imagine three <li> elements already exist on the page.  
var clip = d3.selectAll("li")
    .data(numbers);    
clip.enter()  // everything after enter deals with things that do not already have an element on the html page.
    .append("li")
    .merge(clip) // merge allows us to create one definition of all the elements (those already on the page, and those being added via enter) 
    .text(function(d){
        return d;
    });
//notice that we're merging clip with an earlier version of itself (before chaining). So we're including the elements that were newly appended AND the elements taht were originally captured in the first selectALL



//removing data you use .exit()
var numbers = [14, 15, 16, 17, 18]
d3.selectALL("li").data(numbers)
    .enter()                        
    .append("li")                    
    .text(function(d){ return d;});
    // Then run
var numbers = [42, 53]
d3.selectALL("li").data(numbers)
   .enter()                        
   .exit()                    
   .text(function(d){ return d;});
   // The result will be  42, 53 and the extra will be deleted.


//**  Different types of data.  section 16.1.2
// you can attach data that is actually different javascripts, or images, or urls

var links = [{   // notice this is an array of javascript objects
    Title: "Wikipedia",
    url: "http://www.wikipedia.com"
},
{
    Title: "CNN",
    url: "http://www.cnn.com"
}
];

d3.select("p").selectALL("li") // selects all lis within a paragraph
    .data(links)
    .enter()  // this links the data and identifies which elements are present or needed
    .append("li") // if there are not enough li, they will be added
    .classed("strong", true) // this sets the class of the lis that will be added.  The True means add it if it's mot there.  False would mean remove it if it is there.
    .html(function(d) {      // note that you will need to use the .html to show this data
        return `<a href="${d.url}">`;  // note the "" are there because they are necessary around a url.  They are unnecessary to add tables
    });

//example to add more rows to a table
d3.select("tbody")
  .selectALL("tr")
  .data(tableofdata)
  .enter()
  .append("tr")
  .html(function(d){
    return `<td>${d.cell1}</td><td>${d.cell2}</td><td>${d.cell3}</td>`;
  });


    //** Use .Style to adjust graph bars. Put it all in a function to make it update dynamically 
    // The .style requires an attribute , and a function on how that attribute will change.
    var cookieseaten = [0, 2, 5, 10];
    d3. select("#bar-graph").selectALL("bars")
        .data(cookieseaten)
        .style("height", function(d){
            return d + "px";
        })
        .style("weight", function(d){   
            return d + "px";
        })
        .style("background", function(d){   /// this would change the color of the background
            return `rgb(${d}), rgb(${d}), rgb(${d})`;
        });
    //you can add multiple styles. 

    // if you put the whole thing in a function, that can be called on an event listener (or other) it will update dynamically
    function update(data){
        
        d3.select("table")
        .data()
        .classed("classname", true)
        .style("weight", function(d){   
            return d + "px";
    }

// reading in a csv file.
//The csv requires 2 things,  1) the path of the file 2) a function
// The function runs after you've obtained the data (like a promise, actually it's a callback)
// The function expects a variable for the error in the first parameter, and a variable to capture the data in the second parameter
d3.csv("./name_of_file", function(error, data_from_csv){
    if (error) return console.warn(error);  // this will display the error, if an error has been caught
    console.log(data);
    // working with the data brought in from d3 is like working with a javasctipt object when loading a csv
    // if the csv looks like this:
    /*
    color,count
    red,14
    blue,23
    green,67
    pink,45
    yellow,90
    */
   // To be able to read it, you would need to cast the count data as an int (because it's automatically loaded as a string)
   // To cast it, you would use
   data_from_csv.forEach(function(d){ 
   data_from_csv.count = +data_from_csv.count;
   });





});
   
//min max and extent functions
var numbers = [4, 16, 5, 90, 45];
console.log("This is the min value", d3.min(numbers));
console.log("This is the maximum number", d3.max(numbers));
console.log("This returns an array of two numbers min and max", d3.extent(numbers));
// to use extent to look through all of the fields of an array of objects:
var objects = [
    {
        "id": 34,
        "color": "blue",
        "count" : 45 
    },
    {
        "id": 35,
        "color": "black",
        "count" : 67
    },
    {
        "id": 35,
        "color": "green",
        "count": 78 

    }
];
console.log(d3.extent(data, function(d) {return +d.count}));  // the + is to make sure it returns value as an int, not a string
    // as an arrow function\
console.log(d3.extent(data, d => +d.count)



//**  scaling data
// This is useful when you want your data to fill up the full space of the graph (SVG, canvas, etc).\
var scale_this_num = d3.scaleLinear()  // note, this is a variable holding a function.
    .domain([5, 400])  // given numbers will be between 5 and 400
    .range([0, 5000]);  // This is how much space we actuall have.  basically, we're stretching/shrinking the domain to fit the range in a linear fashion
    // so, to scale, put the number you want scaled in the new function as such
    console.log(`Here is the number 45 scaled", ${scale_this_num(45)}`);

// scaling data you're not certain of the numbers in a dataset (or they are constantly changing?)
// Use the extend methed
var scale_this_num = d3.scaleLinear().domain(d3.extent(numbers)).range([0, svgHeight]);

// Scaling to bands on x axes
// For instance, imagine you have a graph where the X axis is a list of store names, isntead of numbers.
//However, you still want the X axes to scale to fit the full page.
var Num_of_Stores = [6, 8, 23, 15];
var Name_of_Stores = ["Starbucks", "Seattle's Coffee", "Coffee Shop", "Latta Lattes"];

var xaxes = d3.scaleBand()
    .domain(Name_of_Stores)
    .range([0, svgWidth]);
// now to see the x coordinates where these store names will show up 
console.log(`first store x coord: ${xaxes("Starbucks")}`);
console.log(`second store x coord:  ${xaxes(Name_of_Stores[1])}`);
// if you want to see how many pixels wide each band is, you can use the .bandwidth() method
console.log(xaxes.bandwidth());


//** Ways to modify the Axes


