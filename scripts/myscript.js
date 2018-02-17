console.log("hello");



var srcList = $('img').map(function() {
    return this.src;
}).get();


console.log(srcList);