const { InvalidParamError } = require("../utils/errors/index");

const Helper = require("../utils/helper/Helper");

const path = require("path");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const storageTypes = {
	local: multer.diskStorage({

		destination: (req, file, callback) => callback(null, "src/utils/tmp"),

		filename: (req, file, callback) => callback(null, `${Date.now()}-${file.originalname}`)
        
	}),

	s3: multerS3({
		s3: new aws.S3({
			accessKeyId: Helper.getAwsAccessKeyEnvironmentVariable(),
			secretAccessKey: Helper.getAwsAccessSecretKeyEnvironmentVariable(),
			region: Helper.getAwsDefaultRegionEnvironmentVariable()
		}),
		bucket: Helper.getBucketNamenvironmentVariable(),
		contentType: multerS3.AUTO_CONTENT_TYPE,
		acl: "public-read",
		key: (req, file, callback) =>  callback(null, `${Date.now()}-${file.originalname}`)
	})

};

const multerConfig = {

	dest: path.resolve(__dirname, "..", "utils", "tmp"),

	storage: storageTypes[Helper.getStorageEnvironmentVariable()],

	limits: { fileSize: 1024 * 1024 * 100 },

	fileFilter: (req, file, callback) => {
      
		const allowedTypes = [
			"image/jpeg",
			"image/png",
			"video/mp3",
			"video/mp4"
		];

		if (allowedTypes.includes(file.mimetype)) 
			return callback(null, true);

		callback(
			new InvalidParamError(
				"Tipo de Arquivo inválido, o arquivo precisa estar em formato JPEG, PNG, MP3 ou MP4 e precisa ter menos de 100 mb"
			)
		);

	}
};

module.exports = multer(multerConfig).single("file");