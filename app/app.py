import os
import ssl
import paho.mqtt.client as mqtt

def on_connect(client, userdata, flags, rc, properties=None):
    """Callback function when connected to MQTT broker"""
    print(f"Connected to RabbitMQ MQTT broker with result code {rc}")
    client.subscribe("/metrics/heart_rate")

def on_message(client, userdata, msg):
    """Callback function when message received"""
    print(f"Heart Rate: {msg.payload.decode('utf-8')}")


if __name__ == "__main__":
    # Create MQTT client instance
    client = mqtt.Client(protocol=mqtt.MQTTv5)

    client.on_connect = on_connect
    client.on_message = on_message

    try:
        host = os.environ.get("RABBITMQ_HOST", "localhost")
        port = int(os.environ.get("RABBITMQ_PORT", 8883))  # Use TLS port
        user = os.environ.get("RABBITMQ_USER", "guest")
        password = os.environ.get("RABBITMQ_PASS", "guest")
        ca_cert = os.environ.get("CA_CERT", "/app/certs/ca.pem")

        print(f"Connecting to RabbitMQ MQTT broker at {host}:{port} with TLS...")

        client.enable_logger()
        client.username_pw_set(user, password)
        client.tls_set(ca_certs=ca_cert, cert_reqs=ssl.CERT_REQUIRED)
        client.connect(host, port, keepalive=60)

        print("Starting MQTT listener...")
        client.loop_forever()    
    except KeyboardInterrupt:
        print("Exiting...")
    except Exception as e:
        print(f"Error connecting to MQTT broker: {str(e)}")
    finally:
        client.disconnect()
        print("Disconnected from MQTT broker")
        client.loop_stop()
        print("MQTT loop stopped")