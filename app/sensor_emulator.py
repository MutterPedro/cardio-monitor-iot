import json
import logging
import random
import time

from mqtt import initiate_mqtt_tls_session

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

def send_dummy_data(client):
    """Send dummy heart rate data to RabbitMQ"""
    try:
        heart_rate = json.dumps({"heart_rate": random.randint(60, 100)})
        logging.info(f"Publishing heart rate: {heart_rate}")
        client.publish("/metrics/heart_rate", heart_rate)
    except Exception as e:
        logging.error(f"Error publishing data: {str(e)}")

if __name__ == "__main__":
    client, host, port = initiate_mqtt_tls_session("sensor_emulator_publisher")

    client.connect_async(host, port)

    logging.info("Starting MQTT publisher...")
    client.loop_start()
    try:
        while True:
            if client.is_connected():
                send_dummy_data(client)
            time.sleep(1)
    except KeyboardInterrupt:
        logging.info("Exiting...")
    except Exception as e:
        logging.error(f"Error connecting to MQTT broker: {str(e)}")
    finally:
        client.disconnect()
        logging.info("Disconnected from MQTT broker")