import axios from "axios";
import React from "react";

export default function useBackend(method, options, data, messages) {
    const Sendtoback = async (data) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/", data, {
                    headers: {"Content-Type": "application/json"},
                })
                return response;
            ;
            console.log("Успешный ответ и данные отправлены", response.data);
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
            return error;
        }
    };
}