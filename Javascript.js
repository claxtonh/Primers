
// When loading CSV files,  you may need to type in the following command
// you may need to remove a parenthesis in the address bar.
// python3 -m http.server  

// using unary operators (+) on data obtained from CSV
blocks = +blocks // this marks a variable as an int instead of a string
            //alternatives would be writing   blocks = int(blocks)
            //another alternative would be   blocks = parseint(blocks) 



// Arrow functions
// This is just a way to decrease the amoutn of typing.  for instance
.attr("x", function(d, i){
    return xScale(dataCategories[i])
})
// can be rewritten like this
.attr("x", (d, i)=> xScale(dataCategories[i]))
   // the =>  replaces the "return".  This is only available when you are able to run any and all calculations in the return line.
   
