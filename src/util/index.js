import md5 from 'blueimp-md5'

export const genProductID = (name, link) => {
	return md5(`${name}${link}`)
}
