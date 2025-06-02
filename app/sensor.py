import asyncio
import logging
from bleak import BleakClient, BleakScanner

from mqtt import initiate_mqtt_tls_session

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

client, host, port = initiate_mqtt_tls_session("sensor_publisher")


# UUID do serviço de HR (padrão Bluetooth SIG)
HR_UUID = "00002a37-0000-1000-8000-00805f9b34fb"

def handle_hr(_, data):
    hr_value = data[1]
    logging.info(f"Frequência cardíaca: {hr_value} bpm")
    send_data(hr_value)

def send_data(heart_rate):
    try:
        logging.info(f"Publishing heart rate: {heart_rate}")
        client.publish("/metrics/heart_rate", heart_rate)
    except Exception as e:
        logging.error(f"Error publishing data: {str(e)}")

async def main():
    global client, host, port
    client.connect_async(host, port)

    logging.info("Starting MQTT publisher...")
    client.loop_start()
    
    logging.info("Procurando dispositivos BLE...")
    devices = await BleakScanner.discover()
    for d in devices:
        logging.info(f"{d.name} - {d.address}")

    # Substitua com o endereço do seu Polar H10
    address = "A0:9E:1A:B0:11:73"
    # address = input("Digite o endereço do dispositivo Polar H10: ").strip()

    async with BleakClient(address) as client:
        logging.info(f"Conectado a {address}")
        await client.start_notify(HR_UUID, handle_hr)
        logging.info("Lendo frequência cardíaca... Pressione Ctrl+C para sair.")
        while True:
            await asyncio.sleep(1)

asyncio.run(main())
