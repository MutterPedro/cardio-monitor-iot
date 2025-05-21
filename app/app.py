import logging

from wsserver import publish_to_websockets, start_test_client_thread, start_ws_server_thread
from mqtt import initiate_mqtt_tls_session


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

def publish_heart_rate_to_websockets(heart_rate):
    publish_to_websockets(f'{{"heartRate": {heart_rate}}}')

def on_connect(client, userdata, flags, rc, properties=None):
    logging.info(f"Connected to RabbitMQ MQTT broker with result code: {rc}")
    client.subscribe("/metrics/heart_rate")

def on_message(client, userdata, msg):
    payload = msg.payload.decode("utf-8")
    # logging.info(f"Heart Rate: {payload}")

    publish_heart_rate_to_websockets(payload)

def on_subscribe(client, userdata, mid, granted_qos, properties=None):
    logging.info(f"Subscribed with QoS {granted_qos}")

if __name__ == "__main__":
    thread = start_ws_server_thread()
    # start_test_client_thread()

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

        # thread.join()
        # logging.info("WebSocket server thread joined")