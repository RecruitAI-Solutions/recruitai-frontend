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

    let baseUrl = (import.meta.env.VITE_API_BASE_URL as string).replace(
      /\/api$/,
      "",
    );
    if (!baseUrl) baseUrl = window.location.origin;

    // Tạo connection URL: baseUrl + /api/v1/notification-hub
    this.connection = new HubConnectionBuilder()
      .withUrl(`${baseUrl}/api/v1/notification-hub`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    this.connection.on("ReceiveNotification", (notification) => {
      window.dispatchEvent(
        new CustomEvent("new-notification", { detail: notification }),
      );
    });

    try {
      await this.connection.start();
      console.log("SignalR connected");
    } catch (err) {
      console.error("SignalR connection error:", err);
      // Retry sau 5s
      setTimeout(() => this.start(), 5000);
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
