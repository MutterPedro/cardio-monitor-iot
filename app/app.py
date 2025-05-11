import logging

from mqtt import initiate_mqtt_tls_session

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

def on_connect(client, userdata, flags, rc, properties=None):
    """Callback function when connected to MQTT broker"""
    logging.info(f"Connected to RabbitMQ MQTT broker with result code: {rc}")
    client.subscribe("/metrics/heart_rate")

def on_message(client, userdata, msg):
    """Callback function when message received"""
    logging.info(f"Heart Rate: {msg.payload.decode('utf-8')}")

def on_subscribe(client, userdata, mid, granted_qos, properties=None):
    logging.info(f"Subscribed with QoS {granted_qos}")

if __name__ == "__main__":
    client, host, port = initiate_mqtt_tls_session("app_subscriber")

    client.on_connect = on_connect
    client.on_message = on_message
    client.on_subscribe = on_subscribe
    try:
        logging.info("Starting MQTT listener...")
        client.loop_forever()    
    except KeyboardInterrupt:
        logging.info("Exiting...")
    except Exception as e:
        logging.info(f"Error connecting to MQTT broker: {str(e)}")
    finally:
        client.disconnect()
        logging.info("Disconnected from MQTT broker")
        client.loop_stop()
        logging.info("MQTT loop stopped")