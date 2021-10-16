const { NotAllowedCors } = require("../utils/errors/index");

const Helper = require("../utils/helper/Helper");

const cors = require("cors");

const corsOptions = {
    
	origin: (origin, callback) => {

		if (Helper.getAppUrlEnvironmentVariable().indexOf(origin) !== -1) return callback(null, true);
      
		callback(new NotAllowedCors());

	}
};

module.exports = cors(corsOptions);