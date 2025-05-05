import json
import os
import random
import time

import paho.mqtt.client as mqtt

def send_dummy_data(client):
    """Send dummy heart rate data to RabbitMQ"""
    heart_rate = json.dumps({"heart_rate": random.randint(60, 100)})
    client.publish("/metrics/heart_rate", heart_rate)

if __name__ == "__main__":
    client = mqtt.Client(protocol=mqtt.MQTTv5)

    try:
        host = os.environ.get("RABBITMQ_HOST", "localhost")
        port = int(os.environ.get("RABBITMQ_PORT", 1883))
        user = os.environ.get("RABBITMQ_USER", "guest")
        password = os.environ.get("RABBITMQ_PASS", "guest")

        client.username_pw_set(user, password)
        client.connect(host, port, keepalive=60)

        print("Starting MQTT publisher...")
        while True:
            send_dummy_data(client)
            time.sleep(1)
            client.loop()
    except KeyboardInterrupt:
        print("Exiting...")
    except Exception as e:
        print(f"Error connecting to MQTT broker: {str(e)}")
    finally:
        client.disconnect()
        print("Disconnected from MQTT broker")
        # client.loop_stop()
        # print("MQTT loop stopped")