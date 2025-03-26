import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const BASE_URL = process.env.NEXT_PUBLIC_PERSONAL_WEBSITE_CONTENT;
        const [hero, about, skills, portfolio, alumni, contact] = await Promise.all([
            axios.get(`${BASE_URL}/HeroSection`),
            axios.get(`${BASE_URL}/AboutMe`),
            axios.get(`${BASE_URL}/Skills`),
            axios.get(`${BASE_URL}/Portofolio`),
            axios.get(`${BASE_URL}/Alumni`),
            axios.get(`${BASE_URL}/Contact`),
        ]);

        return NextResponse.json({
            hero: hero.data[0] || null,
            about: about.data[0] || null,
            skills: skills.data[0] || null,
            portfolio: portfolio.data[0] || null,
            alumni: alumni.data[0] || null,
            contact: contact.data[0] || null,
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
    }
}
