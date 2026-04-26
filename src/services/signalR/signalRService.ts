import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
} from "@microsoft/signalr";
import { getToken } from "@/services/storage/localStorage";

class SignalRService {
  private connection: HubConnection | null = null;

  async start() {
    const token = getToken();
    if (!token) return;

    this.connection = new HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_BASE_URL}/api/v1/notification-hub`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    this.connection.on("ReceiveNotification", (notification) => {
      // Dispatch custom event để NotificationBell lắng nghe
      window.dispatchEvent(
        new CustomEvent("new-notification", { detail: notification }),
      );
    });

    try {
      await this.connection.start();
      console.log("SignalR connected");
    } catch (err) {
      console.error("SignalR connection error:", err);
      setTimeout(() => this.start(), 5000); // retry sau 5s
    }
  }

  async stop() {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
    }
  }
}

export const signalRService = new SignalRService();
