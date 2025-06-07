import asyncio
import logging
import serial
from mqtt import initiate_mqtt_tls_session

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

client, host, port = initiate_mqtt_tls_session("sensor_publisher")

def handle_hr(data):
    try:
        hr_value = int(data.strip())  # Assuming heart rate data is sent as a plain integer
        logging.info(f"Frequência cardíaca: {hr_value} bpm")
        send_data(hr_value)
    except ValueError:
        logging.error(f"Invalid data received: {data}")

def send_data(heart_rate):
    try:
        logging.info(f"Publishing heart rate: {heart_rate}")
        client.publish("/metrics/heart_rate", heart_rate)
    except Exception as e:
        logging.error(f"Error publishing data: {str(e)}")

async def read_serial_data(port, baudrate):
    try:
        with serial.Serial(port, baudrate, timeout=1) as ser:
            logging.info(f"Conectado à porta serial {port} com baudrate {baudrate}")
            while True:
                if ser.in_waiting > 0:
                    data = ser.readline().decode("utf-8")
                    logging.info(f"Data received: {data}")
                    handle_hr(data)
                await asyncio.sleep(0.1)
    except serial.SerialException as e:
        logging.error(f"Erro ao acessar a porta serial: {str(e)}")

async def main():
    global client, host, port
    client.connect_async(host, port)

    logging.info("Starting MQTT publisher...")
    client.loop_start()

    # Configure the serial port and baudrate
    serial_port = "/dev/ttyUSB0"  # Replace with your serial port
    baudrate = 9600  # Replace with the baudrate of your device

    logging.info("Lendo dados do cabo serial... Pressione Ctrl+C para sair.")
    await read_serial_data(serial_port, baudrate)

asyncio.run(main())
