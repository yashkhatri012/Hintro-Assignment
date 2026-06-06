import axios from "axios";

export const sendTelegramMessage =
  async (message) => {
    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id:
          process.env.TELEGRAM_CHAT_ID,
        text: message,
      }
    );
  };