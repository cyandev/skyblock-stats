require('./src/app');
require('./src/donations/patreon');
require('./src/update-guilds');
require('./src/update-bazaar');
require('./src/update-items');
//require('./src/update-ranks');

const cluster = require('cluster');

if(cluster.isMaster && process.env.API_REQUESTS == "1"){
    let requests = [];

    require('axios-debug-log')({
        request: (debug, config) => {
            if(config.baseURL == 'https://api.hypixel.net/')
                requests.push(+new Date());
        }
    });

    setInterval(() => {
        requests = requests.filter(a => a > +new Date() - 60 * 1000);

        console.log('requests:', requests.length + ' / minute');
    }, 1000);
}
