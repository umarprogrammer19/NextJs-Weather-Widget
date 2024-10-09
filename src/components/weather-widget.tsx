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
        } catch {

        }
    }
    return (
        <h1>Weather Widget</h1>
    )
}