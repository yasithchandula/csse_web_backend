
const BusRoute = require("../../models/busRoute.model")

// get bus route by starting location and destination
async function getRouteByStartAndDestination(startLocation, destination) {
    try {
        const routes = await BusRoute.find({ 'stations.stationName': { $all: [startLocation, destination] } })
            .then(async route => {
                if (route.length > 0) {
                    // get the data(distance from start point of the route) of the start location and destination
                    const startLocationData = await route[0].stations.find(station => station.stationName === startLocation);
                    const destinationData = await route[0].stations.find(station => station.stationName === destination);

                    // get the distance between the start location and destination
                    const distance = Math.abs(destinationData.stationDistance - startLocationData.stationDistance);
                    // calculate the ticket price according to the distance
                    const ticketPrice = route[0].totalPrice / route[0].distance * distance;

                    // return the routes, distance and the ticket price
                    const routeNumbers = route.map(route => route.routeNumber);
                    return {
                        routes: routeNumbers,
                        distance: distance.toFixed(2),
                        ticketPrice: ticketPrice.toFixed(2)
                    };

                } else {
                    return {
                        error: "No route found"
                    }
                }
            })

        return routes;

    } catch (error) {
        console.log(error);
        return {
            error: error
        }
    }
}

module.exports = { getRouteByStartAndDestination };
