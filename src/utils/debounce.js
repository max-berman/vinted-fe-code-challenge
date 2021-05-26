export const debounce = (callback, wait = 250) => {
	let timer
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => callback(...args), wait)
	}
}

/* 
// Testing it:

var d = debounce(() => console.log("CALLED"), 1000);

for (let i = 0; i < 10; i++) {
    // call every 100 ms (change to 1500 to see that debouncing will not happen)
    let timeOut = 100 * i;

    const cb = () => {
        const date = new Date();
        console.log(`calling at ${date.getSeconds()}.${date.getMilliseconds()}`);
        d()
    }
    
    setTimeout(cb, timeOut)
}

*/
