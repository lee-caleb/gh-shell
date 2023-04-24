import got from 'got';


function main() {
	const data = got.post('https://httpbin.org/anything', {
		json: {
			hello: 'world'
		}
	}).json();

	console.log(data);
	// console.log(data.json);
}

main()