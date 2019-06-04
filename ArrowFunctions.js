// arrow functions are the standard way to condense code.



//**  D3 arrow functions
var clip = d3.selectALL("li").data(numbers)
    .text(function(i, d){    // i represents the index of the array and d represents the actual data
        return i, d;
    });  // becomes
var clip = d3.selectALL("li").data(numbers)
    .text((d, i)) => `${i} and ${d}`);
