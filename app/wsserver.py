import logging
import websockets
from websockets.asyncio.server import serve
import asyncio
import threading


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

connected_clients = set()
started = False
ws_loop = None  # Will be set in the server thread

async def websocket_handler(websocket):
    # logging.info("New client connected")
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            await websocket.send(message)
    finally:
        connected_clients.remove(websocket)

async def start_websocket_server():
    global started, ws_loop

    logging.info("Starting WebSocket server...")
    ws_loop = asyncio.get_event_loop()

    async with serve(websocket_handler, "0.0.0.0", 4000) as server:
        started = True
        await server.serve_forever()

def publish_to_websockets(message):
    global ws_loop, started

    if not started:
        return

    # Use the event loop from the websocket server thread
    asyncio.run_coroutine_threadsafe(
        broadcast_message(message), ws_loop
    )

async def broadcast_message(message):
    global connected_clients

    # logging.info(f"Broadcasting message: {message} - {len(connected_clients)} clients connected")
    if connected_clients:
        for client in connected_clients:
            await client.send(message)

def start_ws_server_thread():
    ws_thread = threading.Thread(target=lambda: asyncio.run(start_websocket_server()), daemon=True)
    ws_thread.start()
    return ws_thread


async def test_websocket_client():
    uri = "ws://localhost:4000"
    try:
        async with websockets.connect(uri) as websocket:
            logging.info("Connected to WebSocket server")            
            
            # Listen for messages from the server
            async for message in websocket:
                logging.info(f"Received: {message}")
    except Exception as e:
        logging.error(f"WebSocket client error: {e}")

def start_test_client_thread():
    client_thread = threading.Thread(
        target=lambda: asyncio.run(test_websocket_client()), daemon=True
    )
    client_thread.start()
    return client_thread