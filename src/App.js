import React, { useState } from "react";
import axios from "axios";
import "./App.css";
export default function App() {
  const [list, setlist] = useState([]);
  const [value, setvalue] = useState("");
  const [disabled, setdisabled] = useState(false);
  const handle = async () => {
    setdisabled(true);
    setvalue("");
    const arr = [...JSON.parse(JSON.stringify(list))];
    arr.push(value);
    setlist(arr);
    const OPENAI_API_KEY =
      "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";
    axios
      .post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo-16k-0613",
          messages: [{ role: "user", content: value }],
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      )
      .then((res) => {
        arr.push(res.data.choices);
        setdisabled(false);
        setlist(arr);

        console.log(arr);
      })
      .catch((error) => {
        // 处理错误
        setdisabled(false);
        console.log(error);
      });
  };

  return (
    <div>
      <div className="chat-container">
        <h1>chatGpt</h1>
        <div className="chat-messages">
          {list.map((item, index) => {
            return typeof item === "string" ? (
              <div className="chat-message" key={index}>
                <span className="user">你:</span>
                <span className="content">{item}</span>
              </div>
            ) : (
              <div className="chat-message" key={index}>
                <span className="user">ChatGpt:</span>
                <span className="content">{item[0].message.content}</span>
              </div>
            );
          })}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={value}
            onChange={(e) => setvalue(e.target.value)}
            // onKeyDown={(e) => {
            //   if (e.code === "Enter" && !disabled) handle();
            // }}
            placeholder="Type your message..."
          />
          <button onClick={() => handle()} disabled={disabled}>
            {!disabled ? "发送" : "等待中"}
          </button>
        </div>
      </div>
    </div>
  );
}
