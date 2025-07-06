import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding RewardCatalog...');

  const rewards = [
    // Legendary Items (Yellow background)
    {
      name: 'Shield of the Ancients',
      description:
        'A mystical shield with ancient runes that provides unmatched protection',
      imageUrl:
        'https://res.cloudinary.com/dgkrcxt3p/image/upload/v1751783940/legendary-2_l3yqae.png',
      rarity: 'LEGENDARY',
      type: 'ARMOR',
    },
    {
      name: 'Sword of Valor',
      description:
        'A mystical sword with ancient runes that provides unmatched protection',
      imageUrl:
        'https://res.cloudinary.com/dgkrcxt3p/image/upload/v1751783940/legendary-1_rro0hd.png',
      rarity: 'LEGENDARY',
      type: 'WEAPON',
    },

    // Mythic Items (Pinkish purple background)
    {
      name: 'War Helmet',
      description:
        'A legendary helmet worn by ancient warriors, grants enhanced battle prowess',
      imageUrl:
        'https://res.cloudinary.com/dgkrcxt3p/image/upload/v1751783940/mythic-1_aoed31.png',
      rarity: 'MYTHIC',
      type: 'ARMOR',
    },
    {
      name: 'Elixir of Power',
      description:
        'Enchanted elixir that boosts strength and agility for a short duration',
      imageUrl:
        'https://res.cloudinary.com/dgkrcxt3p/image/upload/v1751800960/mythic-2_rptlmx.png',
      rarity: 'MYTHIC',
      type: 'ARMOR',
    },

    // Epic Items (Purple background)
    {
      name: 'Epic Gladiator Sword',
      description:
        'A masterfully crafted sword with a gleaming blade, favored by champions',
      imageUrl:
        'https://res.cloudinary.com/dgkrcxt3p/image/upload/v1751783931/epic-1_ad1f7p.png',
      rarity: 'EPIC',
      type: 'WEAPON',
    },
    {
      name: 'Enchanted Coin Pouch',
      description: 'A magical pouch that occasionally generates extra coins',
      imageUrl:
        'https://res.cloudinary.com/dgkrcxt3p/image/upload/v1751783934/epic-3_z1iho5.png',
      rarity: 'EPIC',
      type: 'ACCESSORY',
    },
    {
      name: 'Golden Bow',
      description: 'An ornate bow with exceptional range and accuracy',
      imageUrl:
        'https://res.cloudinary.com/dgkrcxt3p/image/upload/v1751783933/epic-2_p94shn.png',
      rarity: 'EPIC',
      type: 'WEAPON',
    },

    // Rare Items (Green background)
    {
      name: 'Axe of the Forest Guardian',
      description: 'A powerful axe that channels the strength of nature',
      imageUrl:
        'https://res.cloudinary.com/dgkrcxt3p/image/upload/v1751783929/common-2_ripoiu.png',
      rarity: 'RARE',
      type: 'ACCESSORY',
    },

    {
      name: 'Ancient Tome',
      description: 'A book containing forgotten knowledge and magical spells',
      imageUrl:
        'https://res.cloudinary.com/dgkrcxt3p/image/upload/v1751783932/common-5_uhayyg.png',
      rarity: 'RARE',
      type: 'ACCESSORY',
    },
    {
      name: "Adventurer's Boots",
      description: 'Sturdy leather boots that increase movement speed',
      imageUrl:
        'https://res.cloudinary.com/dgkrcxt3p/image/upload/v1751783932/common-3_ulgdkb.png',
      rarity: 'RARE',
      type: 'ARMOR',
    },

    {
      name: 'Forest Dagger',
      description: 'A swift blade favored by scouts and assassins',
      imageUrl:
        'https://res.cloudinary.com/dgkrcxt3p/image/upload/v1751783929/common-4_o1kbpf.png',
      rarity: 'RARE',
      type: 'WEAPON',
    },
    {
      name: "Champion's Sword",
      description: 'A well-crafted sword that has seen many battles',
      imageUrl:
        'https://res.cloudinary.com/dgkrcxt3p/image/upload/v1751783926/common-1_bbasln.png',
      rarity: 'RARE',
      type: 'WEAPON',
    },
    {
      name: 'Skeleton Key',
      description: 'A mysterious key that can unlock special chests and doors',
      imageUrl:
        'https://res.cloudinary.com/dgkrcxt3p/image/upload/v1751783933/common-6_qako8g.png',
      rarity: 'RARE',
      type: 'ACCESSORY',
    },
  ];

  // Create all rewards
  for (const reward of rewards) {
    await prisma.rewardCatalog.create({
      data: reward,
    });
  }

  console.log(`✅ Created ${rewards.length} rewards in the catalog`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
