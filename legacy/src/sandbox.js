
//-------------PROMISES AND STUFF---------------

//a promise should either resolve or reject

// either going to call resolve or reject
// resolve is like a res.send(200)
// reject of promise is like the .catch
const samplePromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('done'), 2000) //send back after 2 seconds

});

samplePromise.then((response) => {
    console.log('sample promise has resolved with:', response)
}).catch(error => {
    // whatever we pass in here is what we get back as the response/error
})

//---------------------------------------------

// now, we'll create a function that will return a promise

function spooky() {    //will either resolve or reject
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('🎃'), 2000);
    })
}

//STANDARD:



 // started all of these at once, no 2s breaks in between!

//IF WE WANT TO WAIT BETWEEN, WE MAKE AN ASYNC FUNCTION!!!!
// HERE'S ONE WITH AWAITS:

const oneByOne = async () => {
    // await spooky().then(response => console.log(response));
    // await spooky().then(response => console.log(response));
    // await spooky().then(response => console.log(response));  
    let response = await spooky();
    console.log(response);
    response = await spooky();
    console.log(response);
}