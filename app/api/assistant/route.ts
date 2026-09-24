import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, dates, guests } = body;

    if (action === "plan_itinerary") {
      return NextResponse.json({
        success: true,
        data: {
          title: "Curated 3-Day Bromo Celestial & Caldera Expedition",
          summary: "An exclusive private journey featuring King Kong Hill sunrise, private 4x4 lava exploration, sacred Luhur Poten blessings, and five-star mountain hospitality.",
          recommendedDays: [
            {
              day: 1,
              theme: "Ascent & Highland Acclimatization",
              schedule: [
                { time: "01:00 PM", activity: "Private luxury transfer from Surabaya / Malang", location: "Bromo Highland Escarpment", tips: "Enjoy panoramic terrace tea at Plataran Bromo." },
                { time: "04:30 PM", activity: "Sunset over Bukit Teletubbies & Green Savanna", location: "Southern Caldera", tips: "Golden light filters across the verdant rolling hills." },
                { time: "07:30 PM", activity: "Stargazing and firepit dinner under the Milky Way", location: "Jiwa Jawa Amphitheater", tips: "Clear high-altitude skies reveal stellar nebulae." }
              ]
            },
            {
              day: 2,
              theme: "The Legendary Sunrise & Volcanic Crater Rim",
              schedule: [
                { time: "03:15 AM", activity: "Custom 4x4 Land Cruiser departure to Penanjakan 1 / King Kong Hill", location: "Mount Penanjakan (2,770m)", tips: "Thermal down jackets and warm gloves provided." },
                { time: "05:15 AM", activity: "Dawn golden hour spectacle over Mt Bromo, Batok & smoking Semeru", location: "King Kong Hill Viewpoint", tips: "Private hot ginger tea and Indonesian artisan roast." },
                { time: "06:30 AM", activity: "Descent into Lautan Pasir (Sea of Sand) & Pura Luhur Poten visit", location: "Caldera Floor", tips: "Experience serene morning silence in the sacred volcanic plain." },
                { time: "07:30 AM", activity: "Caldera horseback expedition & crater stairs ascent", location: "Bromo Crater Rim (2,329m)", tips: "Peer directly into the active sulfuric caldera vent." }
              ]
            },
            {
              day: 3,
              theme: "Madakaripura Canyon & Farewell",
              schedule: [
                { time: "08:30 AM", activity: "Highland farm-to-table breakfast with view of Mount Batok", location: "Villa Dining Pavilion", tips: "Local organic highland strawberries and honey." },
                { time: "10:30 AM", activity: "Hidden Madakaripura Waterfall trek through ancient mossy canyon", location: "Lumbang, Probolinggo", tips: "Waterproof ponchos provided for the natural curtain shower." }
              ]
            }
          ],
          gearAdvice: [
            "Thermal layers (early morning temperatures average 3°C - 8°C)",
            "Sturdy hiking boots with caldera grip",
            "UV sunglasses and lightweight dust buff/mask for the Sea of Sand",
            "Camera with wide-angle lens (16-35mm) & tripod for dawn astro-photography"
          ],
          villaRecommendation: {
            name: "Plataran Bromo Luxury Suite",
            reason: "Panoramic mountain valley views, wood-burning fireplaces, and heated plunge pools.",
            estimatedNightlyRate: "$285/night"
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      confirmationId: `WL-${Math.floor(100000 + Math.random() * 900000)}`,
      message: `Thank you for scheduling with Wanderlush! Your expedition inquiry for ${guests || "2"} guests on ${dates || "the upcoming season"} has been received. Our private concierge will reach out with your 4x4 Land Cruiser manifest and personalized itinerary.`
    });

  } catch (error: unknown) {
    console.error("Concierge API error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to process expedition request" },
      { status: 500 }
    );
  }
}
