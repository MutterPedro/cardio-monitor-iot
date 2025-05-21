import logging
import os
import ssl
import paho.mqtt.client as mqtt

def initiate_mqtt_tls_session(client_id):
    """Connect to RabbitMQ MQTT broker with TLS"""    
    
    host = os.environ.get("RABBITMQ_HOST", "localhost")
    port = int(os.environ.get("RABBITMQ_PORT", 8883))  # Use TLS port
    user = os.environ.get("RABBITMQ_USER", "guest")
    password = os.environ.get("RABBITMQ_PASS", "guest")
    ca_cert = os.environ.get("CA_CERT", "/app/certs/ca.pem")
    server_cert = os.environ.get("SERVER_CERT", "/app/certs/cert.pem")
    client_key = os.environ.get("CLIENT_KEY", "/app/certs/key.pem")

    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, protocol=mqtt.MQTTv5, client_id=client_id)
    client.port = port
    client.host = host
    client.enable_logger(logging.getLogger("paho-mqtt"))
    client.username_pw_set(user, password)

    # Create a custom SSL context with hostname verification disabled
    ssl_context = ssl.create_default_context(cafile=ca_cert)
    ssl_context.check_hostname = False
    ssl_context.load_cert_chain(certfile=server_cert, keyfile=client_key)

    # Use the custom SSL context
    client.tls_set_context(ssl_context)
    client.username_pw_set(user, password)

    return client, host, port