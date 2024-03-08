import type {Metadata, Viewport} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Providers from "@/app/Stores/Providers";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};
export const viewport: Viewport = {
    initialScale: 1,
    width: 'device-width',
    interactiveWidget:"overlays-content",

}

export default function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
        <body className={inter.className + " overflow-clip"}>
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}
