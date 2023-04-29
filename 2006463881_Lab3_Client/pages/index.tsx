import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { Form } from "@/components/form";
import { MainComponent } from "@/components/main";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Client Lab 3</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative">
        <Toaster />
        <main className="w-full bg-blue-200 p-10 sm:py-20 sm:px-10 lg:py-20 lg:px-32">
          <h1 className="font-bold text-3xl text-blue-900">Client Lab 3 Enterprise Application Integration </h1>
          <h3 className="font-medium text-xl text-blue-800">Zidan Kharisma Adidarma (2006463881)</h3>
          <section className="my-10">
            <Form />
          </section>
          <section>
            <MainComponent />
          </section>
        </main>
      </div>
    </>
  );
}