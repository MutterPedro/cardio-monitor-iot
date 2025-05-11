mkdir -p certs
openssl req -new -x509 -days 365 -nodes -out certs/ca.pem -keyout certs/ca.key
openssl req -newkey rsa:2048 -nodes -keyout certs/key.pem -out certs/cert.csr
openssl x509 -req -in certs/cert.csr -CA certs/ca.pem -CAkey certs/ca.key -CAcreateserial -out certs/cert.pem -days 365

echo "Certificates generated in the certs directory."
echo "CA Certificate: certs/ca.pem"
echo "Server Certificate: certs/cert.pem"
echo "Server Key: certs/key.pem"
echo "CA Key: certs/ca.key"
echo "CA Serial: certs/ca.srl"

