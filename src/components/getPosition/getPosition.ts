import { Coordinates} from "../../interfaces/interfaces";

async function getPosition(): Promise<Coordinates> {
	return new Promise((resolve, reject) => {
		if ('geolocation' in navigator) {
			const geo = navigator.geolocation;
			geo.getCurrentPosition(pos => {
				const position: Coordinates = {
					latitude: pos.coords.latitude,
					longitude: pos.coords.longitude
				}
				resolve(position)
			}, error => {
				reject(error.message)
			})
		} else {
			reject('Please upgrade your browser to use this web app.')
		}
	})
}
export { getPosition }