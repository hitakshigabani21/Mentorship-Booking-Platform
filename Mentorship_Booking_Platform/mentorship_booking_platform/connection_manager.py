#Step:1 Create this class 
import asyncio
from fastapi import WebSocket

class ConnectionManager:

    def __init__(self):
        self.active_connections = [] #store connections

    async def connect(self, websocket: WebSocket):    #connect(): jab frontend connect karta hai tab backend usko store karta hai

        await websocket.accept()

        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):       #disconnect(): browser band hua ya page leave hua, connection remove ho jaata hai

        self.active_connections.remove(websocket)

    async def broadcast(self, message):       #yeh sab clients ko message bhejta hai

        for connection in self.active_connections:
            await connection.send_json(message)

    def broadcast_sync(self, message):

        try:
            loop = asyncio.get_running_loop()

            loop.create_task(
                self.broadcast(message)
            )

        except RuntimeError:

            asyncio.run(
                self.broadcast(message)
            )

manager = ConnectionManager()