import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const suites = await prisma.roomCategory.upsert({
    where: { slug: "suites" },
    update: {},
    create: { name: "Suites", slug: "suites", description: "Our most luxurious accommodation options" },
  });

  const chalets = await prisma.roomCategory.upsert({
    where: { slug: "chalets" },
    update: {},
    create: { name: "Chalets", slug: "chalets", description: "Private standalone units in the gardens" },
  });

  const standardRooms = await prisma.roomCategory.upsert({
    where: { slug: "rooms" },
    update: {},
    create: { name: "Rooms", slug: "rooms", description: "Comfortable rooms for every traveller" },
  });

  const roomData = [
    {
      name: "Presidential Suite",
      slug: "presidential-suite",
      categoryId: suites.id,
      description: "Our flagship suite.",
      longDesc: "Our flagship Presidential Suite is a statement in opulence. Spanning over 80 square metres, this magnificent suite features a separate living room, private dining area, a master bedroom with king-size bed, and a luxuriously appointed en suite bathroom with both a soaking tub and rain shower.",
      pricePerNight: 280,
      maxOccupancy: 2,
      bedCount: 1,
      bedType: "King",
      sizeM2: 80,
      roomNumber: "201",
    },
    {
      name: "Executive Suite",
      slug: "executive-suite",
      categoryId: suites.id,
      description: "Sophisticated comfort for the discerning traveller.",
      longDesc: "The Executive Suite blends refined aesthetics with all the comforts of home. A spacious bedroom leads to an elegant sitting area and an en suite bathroom with a double vanity and walk-in rain shower.",
      pricePerNight: 220,
      maxOccupancy: 2,
      bedCount: 1,
      bedType: "King",
      sizeM2: 60,
      roomNumber: "202",
    },
    {
      name: "Family Suite",
      slug: "family-suite",
      categoryId: suites.id,
      description: "Spacious comfort designed for families.",
      longDesc: "Our Family Suite offers generous interconnected spaces perfect for families travelling together. With a master bedroom, a second room with twin beds, and a shared lounge area.",
      pricePerNight: 240,
      maxOccupancy: 4,
      bedCount: 3,
      bedType: "King + Twin",
      sizeM2: 75,
      roomNumber: "101",
    },
    {
      name: "Garden Chalet",
      slug: "garden-chalet",
      categoryId: chalets.id,
      description: "Nestled in nature, beautifully private.",
      longDesc: "Our Garden Chalets are standalone units set within the estate's lush gardens, offering a private and peaceful retreat. Each chalet features a verandah with garden views.",
      pricePerNight: 180,
      maxOccupancy: 2,
      bedCount: 1,
      bedType: "King",
      sizeM2: 45,
      roomNumber: "G01",
    },
    {
      name: "Pool Chalet",
      slug: "pool-chalet",
      categoryId: chalets.id,
      description: "Wake up steps from the water.",
      longDesc: "Pool Chalets open directly onto the pool terrace, offering a seamless indoor-outdoor living experience.",
      pricePerNight: 200,
      maxOccupancy: 2,
      bedCount: 1,
      bedType: "King",
      sizeM2: 50,
      roomNumber: "P01",
    },
    {
      name: "Deluxe Room",
      slug: "deluxe-room",
      categoryId: standardRooms.id,
      description: "Comfortable luxury for every budget.",
      longDesc: "Our Deluxe Rooms offer the quality and comfort Chapungu Estates is known for, at an accessible price point.",
      pricePerNight: 120,
      maxOccupancy: 2,
      bedCount: 1,
      bedType: "Queen",
      sizeM2: 30,
      roomNumber: "102",
    },
  ];

  for (const room of roomData) {
    await prisma.room.upsert({
      where: { slug: room.slug },
      update: {},
      create: { ...room, isAvailable: true },
    });
  }

  const menuCats = [
    { name: "Breakfast", slug: "breakfast", sortOrder: 1 },
    { name: "Starters", slug: "starters", sortOrder: 2 },
    { name: "Mains", slug: "mains", sortOrder: 3 },
    { name: "Braai", slug: "braai", sortOrder: 4 },
    { name: "Desserts", slug: "desserts", sortOrder: 5 },
    { name: "Drinks", slug: "drinks", sortOrder: 6 },
  ];

  for (const cat of menuCats) {
    await prisma.menuCategory.upsert({ where: { slug: cat.slug }, update: {}, create: cat });
  }

  const productCats = [
    { name: "Premium Beef", slug: "beef" },
    { name: "Pork", slug: "pork" },
    { name: "Poultry", slug: "poultry" },
    { name: "Game Meat", slug: "game" },
    { name: "Groceries", slug: "groceries" },
  ];

  for (const cat of productCats) {
    await prisma.productCategory.upsert({ where: { slug: cat.slug }, update: {}, create: cat });
  }

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
