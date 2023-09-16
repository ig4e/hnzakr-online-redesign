import * as jsonwebtoken from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET!;
const algorithm = "HS384";

export function signJwt(data: object) {
	return jsonwebtoken.sign(data, JWT_SECRET, { algorithm });
}

export function verifyJwt<Payload extends object>(jwt: string) {
	const payload = jsonwebtoken.verify(jwt, JWT_SECRET, { algorithms: [algorithm] });
	return payload as Payload;
}
