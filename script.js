document.getElementById("summarizeBtn").addEventListener("click", async () => {
    const input = document.getElementById("inputText").value.trim();
    const output = document.getElementById("summaryText");
  
    if (!input) {
      output.textContent = "入力内容が空です。";
      return;
    }
  
    output.textContent = "要約を生成中...";
  
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `以下の学習記録を日本語で1文に要約してください：\n${input}`
            }
          ],
          temperature: 0.7
        })
      });
  
      const data = await res.json();
      const summary = data.choices[0].message.content.trim();
      output.textContent = summary;
    } catch (err) {
      output.textContent = "要約の生成に失敗しました。APIキーやネット接続を確認してください。";
      console.error(err);
    }
  });
  