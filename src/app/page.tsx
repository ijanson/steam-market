'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Spinner } from '@/components/ui/spinner';

import useSWR from "swr";

const apiKey: string = process.env.NEXT_PUBLIC_STEAM_API_KEY!;
const steamUrl: string = "https://api.steamapis.com/market/items/730?api_key=" + apiKey;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR(steamUrl, fetcher);

  if (error) return "Error";
  if (isLoading) return <div className="flex h-screen justify-center items-center"><Spinner size="large" /></div>

  const cards = [];
  for (let i = 0; i < 12; i++) {
    cards.push(
      <Card key={i} className="w-[350px] h-[350px]">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg h-[56px]">{data.data[i].market_name}</CardTitle>
          <CardDescription>${data.data[i].prices.safe.toFixed(2)}</CardDescription>
        </CardHeader>
        <CardContent>
          <img src={data.data[i].image} className="object-scale-down w-full h-full" />
        </CardContent>
      </Card>
    );
  }
  return (
    <main className="p-24">
      <div className="flex flex-row flex-wrap gap-10 justify-center">
        {cards}
      </div>       
    </main>
  );
}
