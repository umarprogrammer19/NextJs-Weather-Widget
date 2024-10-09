"use client";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CloudIcon, MapPinIcon, ThermometerIcon } from "lucide-react";
import React, { useState } from "react";

interface WeatherData {
    temperature: number;
    description: string;
    location: string;
    unit: string;
}

export default function WeatherWidget() {
    const [location, setLocation] = useState<string>("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loadind, setLoading] = useState<boolean>(false);

    const handleSearch = async () => {
        // event.preventDefult();
        const trimmedLocation = location.trim();
        if (trimmedLocation === "") {
            setError("Please Enter a Valid Location");
            setWeather(null);
            return
        }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${trimmedLocation}`);
            if (!response.ok) {
                throw new Error("City Not Found");
            }
            const data = await response.json();
            const weatherData: WeatherData = {
                temperature: data.current.temp_c,
                description: data.current.condition.text,
                location: data.location.name,
                unit: "C",
            }
            setWeather(weatherData);
        } catch (error) {
            setError("City not found. Please try again.");
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    function getWeatherMessage(description: string): string {
        switch (description.toLowerCase()) {
            case "sunny":
                return "It's a beautiful sunny day!";
            case "partly cloudy":
                return "Expect some clouds and sunshine.";
            case "cloudy":
                return "It's cloudy today.";
            case "overcast":
                return "The sky is overcast.";
            case "rain":
                return "Don't forget your umbrella! It's raining.";
            case "thunderstorm":
                return "Thunderstorms are expected today.";
            case "snow":
                return "Bundle up! It's snowing.";
            case "mist":
                return "It's misty outside.";
            case "fog":
                return "Be careful, there's fog outside.";
            default:
                return description; // Default to returning the description as-is
        }
    };

    const getTemperatureMessage = (temperature: number, unit: string): string => {
        if (unit === "C") {
            if (temperature < 0) {
                return `It's freezing at ${temperature}°C! Bundle up!`;
            } else if (temperature < 10) {
                return `It's quite cold at ${temperature}°C. Wear warm clothes.`;
            } else if (temperature < 20) {
                return `The temperature is ${temperature}°C. Comfortable for a light jacket.`;
            } else if (temperature < 30) {
                return `It's a pleasant ${temperature}°C. Enjoy the nice weather!`;
            } else {
                return `It's hot at ${temperature}°C. Stay hydrated!`;
            }
        } else {
            return `${temperature}°${unit}`;
        }
    };

    return (
        <h1>Weather Widget</h1>
    )
}